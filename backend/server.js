import express from 'express';
import bodyParser from 'body-parser'; 
import cors from 'cors'; 
import connectDB from './configs/db.js';
import { config } from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/ClerkWebhooks.js';
import hotelRoutes from './routes/hotelRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js'; // ✅ Corrected import

config(); // Load .env

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

connectDB();

app.use(clerkMiddleware());

// Routes
app.use('/api/clerk', clerkWebhooks);
app.use('/api/user', userRoutes);      // ✅ /api/user/getUser
app.use('/api/hotels', hotelRoutes);   // ✅ /api/hotels/...
app.use('/api/room', roomRoutes);      // ✅ /api/room/...
app.use('/api/booking', bookingRoutes); // ✅ /api/booking/...

// Test Route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
