import express from 'express';
import bodyParser from 'body-parser'; 
//import cors from 'cors'; 
import connectDB from './configs/db.js'
import { config } from 'dotenv'; 
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/ClerkWebhooks.js';
import conectcoudinary from './configs/cloudinary.js';
import roomRoutes from './routes/roomRoutes.js'

config();
const app = express();
app.use(bodyParser.json()); 
//app.use(cors()); 
 connectDB();
 conectcoudinary();
const PORT = process.env.PORT || 3000; 
app.use(clerkMiddleware());
//api to listen to clerk webhooks//
app.use('/api/clerk',clerkWebhooks);
app.use('/api/room',roomRoutes);
app.get('/', (req, res) => {
  res.send( 'API is working');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});