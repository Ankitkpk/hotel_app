import Stripe from 'stripe';
import Booking from '../models/Booking.js'; // Make sure the file extension is correct (.js)
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const bookingId = session.metadata?.bookingId;
    if (bookingId) {
      try {
        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentMethod: 'Stripe',
        });
      } catch (err) {
        console.error('Failed to update booking:', err);
        return res.status(500).send('Internal Server Error');
      }
    }
  } else {
    console.log('Unhandled event type:', event.type);
  }

  res.json({ received: true });
};
