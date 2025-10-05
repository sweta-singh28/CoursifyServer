const User = require("../../models/User");

// User details by ID
exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params; // get userId from URL
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
