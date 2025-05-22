import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/ClerkWebhooks.js';
import hotelRoutes from './routes/hotelRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// CORS setup
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials: true,
}));

connectDB();

// Clerk auth middleware
app.use(clerkMiddleware());

app.post('/api/clerk', express.raw({ type: 'application/json' }), (req, res, next) => {
  console.log('⚡️ /api/clerk endpoint HIT');
  next();
}, clerkWebhooks);

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/booking', bookingRoutes);

// Default test route
app.get('/', (req, res) => {
  res.send('API is working');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
