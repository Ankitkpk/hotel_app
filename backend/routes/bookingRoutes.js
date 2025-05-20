import express from 'express';
import upload from '../middleware/uploadmiddleware.js'
import { checkAvailabilityApi,createBookings,userBookings,getHotelBooking} from '../controllers/BookingController.js';
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/check-availability',checkAvailabilityApi);
router.post('/book',protect,createBookings);
router.get('/user',protect,userBookings);
router.get('/book',protect,getHotelBooking);


export default router;
