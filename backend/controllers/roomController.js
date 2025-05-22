//API TO CREATE A NEW ROOM //
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js'; 
import uploadImageOnCloudinary from '../utile/cloudinary.js';

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities} = req.body;
    // Validate required fields
    if (!roomType || !pricePerNight || !amenities) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: roomType, pricePerNight, amenities.',
      });
    }
     // Retrieve the hotel for the authenticated user
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
   if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found for the authenticated user.',
      });
    }
    console.log(req.files);
   if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image file is required.',
      });
    }
   // run multiple asynchronous tasks in parallel and wait until all of them are complete.//
    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadImageOnCloudinary(file.path);
        return result.secure_url;
      })
    );

    // Create a new room
    const newRoom = new Room({
      hotel: hotel._id,
      roomType,
      pricePerNight,
      amenities,
      images: uploadedImages
    });

    await newRoom.save();
    res.status(201).json({
      success: true,
      message: 'Room created successfully.',
      room: newRoom,
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};


//API to get All Rooms 
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: 'hotel', 
        populate: {
          path: 'owner',
          select: 'image'
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      rooms
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

//Api get rooms for a particulat hotel //

export const getOwnerRoom = async (req, res) => {
  try {
    // Get hotel data by owner ID
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    
    if (!hotelData) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found for this user.',
      });
    }

    const rooms = await Room.find({ hotel: hotelData._id.toString()}).populate('hotel')

    if (rooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No rooms found for this hotel.',
      });
    }

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    console.error('Error fetching rooms for hotel:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};


//API to toggle availability of room //
export const toggleRoomAvailability = async (req, res) => {
  const { roomId } = req.body;

  try {
    // Check if the room exists
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found.',
      });
    }

    // Toggle the availability
    room.isAvailable = !room.isAvailable;

    // Save the updated room
    await room.save();

    res.status(200).json({
      success: true,
      message: `Room availability toggled to ${room.isAvailable ? 'Available' : 'Unavailable'}.`,
      room,
    });
  } catch (error) {
    console.error('Error toggling room availability:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};