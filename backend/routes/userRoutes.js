import express from 'express';
import  protect  from '../middleware/authmiddleware.js'; 
import { getUserData,storeRecentSearchcities} from '../controllers/userController.js'; 

const router = express.Router();

router.get('/getUser', protect, getUserData);
router.post('/storeRecentSearchcities',protect,storeRecentSearchcities)

export default router;
