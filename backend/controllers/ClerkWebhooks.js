import User from '../models/User';
import {Webhook} from 'svix';

const clerkWebhooks = async (req, res) => {
  try {
    // Initialize the Webhook instance with your Clerk secret key
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Extract necessary headers required for verification
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify the incoming webhook using Svix
    await webhook.verify(JSON.stringify(req.body), headers);

    // Extract event data and event type from the request body
    const { data, type } = req.body;

    // Format the user data for your database
    const userData = {
      _id: data.id,
      email: data.email_addresses[0]?.email_address, 
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    // Handle different webhook event types
    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }

      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }
  // Respond with success
    res.json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default clerkWebhooks;
