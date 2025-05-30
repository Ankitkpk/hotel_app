import transporter from '../configs/nodemailer.js';
import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import Stripe from 'stripe';

// Function to check availability of room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    return bookings.length === 0;
  } catch (error) {
    console.error('Error checking availability:', error);
    return false;
  }
};

// API: Check room availability
export const checkAvailabilityApi = async (req, res) => {
  const { checkInDate, checkOutDate, room } = req.body;

  if (!checkInDate || !checkOutDate || !room) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });

    return res.status(200).json({
      room,
      isAvailable,
      message: isAvailable ? 'Room is available' : 'Room is not available',
    });
  } catch (error) {
    console.error('Error in checkAvailabilityApi:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// API: Create new booking
export const createBookings = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;

    // Validate required fields
    if (!room || !checkInDate || !checkOutDate || !guests) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = req.user._id; // assumes authentication middleware sets req.user

    // Check room availability
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available for booking during selected dates',
      });
    }

    // Get room data and calculate price
    const roomData = await Room.findById(room).populate('hotel');
    if (!roomData) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const pricePerNight = roomData.pricePerNight;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
    const totalPrice = pricePerNight * nights;

    // Create booking
    const newBooking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      checkInDate,
      checkOutDate,
      guests: +guests,
      totalPrice,
    });

    // Send booking confirmation email
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: req.user.email,
      subject: 'Hotel Booking Details',
      html: `
        <h2>Your Booking Details</h2>
        <p>Dear ${req.user.name},</p>
        <p>Thank you for booking with us! Below are your booking details:</p>
        <ul>
          <li><strong>Booking Id:</strong> ${newBooking._id}</li>
          <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
          <li><strong>Location:</strong> ${roomData.hotel.address}</li>
          <li><strong>Check-in:</strong> ${new Date(checkInDate).toLocaleDateString()}</li>
          <li><strong>Check-out:</strong> ${new Date(checkOutDate).toLocaleDateString()}</li>
          <li><strong>Amount:</strong> $${totalPrice}</li>
        </ul>
        <p>We look forward to welcoming you!</p>
        <p>If you need changes, feel free to contact us.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// API: Get all bookings for the logged-in user
export const userBookings = async (req, res) => {
  const user = req.user._id;

  try {
    const bookings = await Booking.find({ user })
      .populate('room')
      .populate('hotel')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'User bookings fetched successfully',
      bookings,
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// API: Get all bookings for the hotel owned by the logged-in user
export const getHotelBooking = async (req, res) => {
  try {
    // Find the hotel owned by the logged-in user
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'No hotel found for this owner',
      });
    }

    // Find bookings for that hotel
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate('user')
      .populate('room')
      .populate('hotel')
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

    return res.status(200).json({
      success: true,
      message: 'Bookings fetched successfully',
      totalBookings,
      totalRevenue,
      bookings,
    });
  } catch (error) {
    console.error('Error fetching hotel bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// API: Stripe payment for booking
export const stripePayment = async (req, res) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Mark booking as paid and update status
    booking.isPaid = true;
    booking.status = 'completed';
    await booking.save();

    const roomData = await Room.findById(booking.room).populate('hotel');
    if (!roomData || !roomData.hotel) {
      return res.status(404).json({ success: false, message: 'Room or Hotel not found' });
    }

    const totalPrice = booking.totalPrice;
    const { origin } = req.headers;

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: roomData.hotel.name,
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ];

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/loader/my-booking`,
      cancel_url: `${origin}/my-booking`,
      metadata: {
        bookingId,
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Stripe payment error:', error);
    return res.status(500).json({
      success: false,
      message: 'Payment processing failed',
      error: error.message,
    });
  }
};
