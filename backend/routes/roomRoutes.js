import express from 'express';
import upload from '../middleware/uploadmiddleware.js'
import {createRoom,getAllRooms,getOwnerRoom,toggleRoomAvailability} from '../controllers/roomController.js'
import protect from '../middleware/authmiddleware.js';
const router = express.Router();

router.post('/' , upload.array('images',4),protect,createRoom);
router.get('/getAllrooms' ,getAllRooms);
router.get('/owner' , getOwnerRoom);
router.post('/toggle-Availability' ,toggleRoomAvailability);

export default router;
