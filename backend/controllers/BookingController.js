import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';

//function to check availability of room//
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate }
    });
    const isAvailable=bookings.length === 0
    return isAvailable
  } catch (error) {
    console.error('Error checking availability:', error);
    return false;
  }
};


//CHECK FOR AVAILABLITY API/

export const checkAvailabilityApi = async (req, res) => {
  const { checkInDate, checkOutDate, room } = req.body;
  if (!checkInDate || !checkOutDate || !room) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });

    return res.status(200).json({
      room,
      isAvailable,
      message: isAvailable ? "Room is available" : "Room is not available"
    });
  } catch (error) {
    console.error("Error in checkAvailabilityApi:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

//API TO create new Bookings//




export const createBookings = async (req, res) => {
  try {
    const {
      room,
      checkInDate,
      checkOutDate,
      guests,
    } = req.body;

    // 1. Validate required fields
    if (!room || !checkInDate || !checkOutDate || !guests) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = req.user._id; // assumes authentication middleware sets req.user

    // 2. Check if room is available
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available for booking during selected dates',
      });
    }

    // 3. Get room data & calculate price
    const roomData = await Room.findById(room).populate('hotel');

    if (!roomData) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const pricePerNight = roomData.pricePerNight;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const timeDiff = checkOut - checkIn;
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const totalPrice = pricePerNight * nights;

    // 4. Create booking
    const newBooking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      checkInDate,
      checkOutDate,
      guests: +guests,
      totalPrice,
    });

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

//API TO GET ALL BOOKINGS FOR USER//
export const userBookings = async (req, res) => {
  const user = req.user._id; 

  try {
    const bookings = await Booking.find({ user })
      .populate('room')
      .populate('hotel')
      .sort({ createdAt: -1 }); // latest bookings first

    res.status(200).json({
      success: true,
      message: 'User bookings fetched successfully',
      bookings,
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};



//get all bookings for hotel//
export const getHotelBooking = async (req, res) => {
  try {
    // Find the single hotel owned by the logged-in user
    console.log(req.auth._id);
    const hotel = await Hotel.findOne({ owner: req.auth._id });

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
     console.log(bookings);
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
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};


