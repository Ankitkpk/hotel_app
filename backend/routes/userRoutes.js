import express from 'express';
import User from '../models/User.js';
import  protect  from '../middleware/authmiddleware.js'; 
import { getUserData,storeRecentSearchcities} from '../controllers/UserController.js'; 

const router = express.Router();

router.get('/getUser', protect, getUserData);
router.post('/sync', async (req, res) => {
  try {
    const { _id, email, username, image } = req.body;
    const existingUser = await User.findById(_id);

    if (!existingUser) {
      await User.create({ _id, email, username, image });
    } else {
      await User.findByIdAndUpdate(_id, { email, username, image });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("User sync error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/SetSearchedCities',protect,storeRecentSearchcities)

export default router;
