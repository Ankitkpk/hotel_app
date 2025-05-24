import User from '../models/User.js'
import { Webhook } from 'svix';

const clerkWebhooks = async (req, res) => {
  try {
    console.log('🔔 Clerk webhook received');

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const payload = req.body; // this is a Buffer from express.raw()

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = webhook.verify(payload, headers); // verify and parse JSON

    const { data, type } = evt;

    console.log(`📦 Webhook Type: ${type}`);
    console.log('👤 Incoming User Data:', data);

    const userData = {
      _id: data.id,
      email: data.email_addresses[0]?.email_address,
      username: `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim(),
      image: data.image_url,
    };

    switch (type) {
      case "user.created": {
        const exists = await User.findById(data.id);
        if (!exists) {
          await User.create(userData);
          console.log('✅ User created in DB:', userData);
        }
        break;
      }
      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        console.log('🔄 User updated in DB:', data.id);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log('❌ User deleted from DB:', data.id);
        break;
      }
      default:
        console.log('⚠️ Unhandled webhook type:', type);
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❗️Webhook error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};


export default clerkWebhooks;
