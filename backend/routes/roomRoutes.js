import express from 'express';
import upload from '../middleware/uploadmiddleware.js'
import {createRoom,getAllRooms} from '../controllers/roomController.js'
import protect from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/' , upload.array('images',4),protect,createRoom);
router.get('/' ,getAllRooms);

export default router;
