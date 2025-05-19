import express from 'express';
import { protect } from '../middleware/authmiddleware.js'; 
import {registerHotel} from '../controllers/HotelController.js'

const router = express.Router();


router.post('/registerHotel',protect,registerHotel);

export default router;
