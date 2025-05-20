import User from '../models/User.js'

 const protect = async (req, res, next) => {
  try {
    const { userId } = req.auth;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default protect