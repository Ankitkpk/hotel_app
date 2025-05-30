import Hotel from '../models/Hotel.js'
import User from '../models/User.js';

export const registerHotel = async (req, res) => {
  const { name, address, contact, city } = req.body;
  const owner = req.user._id;
  try {
    const existingHotel = await Hotel.findOne({owner });

    if (existingHotel) {
      return res.status(400).json({
        success: false,
        message: 'Hotel  already exists for this owner.',
      });
    }

    // Create and save the new hotel
    const hotel = new Hotel({
      name,
      address,
      contact,
      city,
      owner,
    });

    await hotel.save();
    await User.findByIdAndUpdate(owner, { role: 'hotelOwner' });
    res.status(201).json({
      success: true,
      message: 'Hotel registered successfully.',
      hotel,
    });
  } catch (error) {
    console.error('Error registering hotel:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
