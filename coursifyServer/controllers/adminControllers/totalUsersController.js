const User = require("../../models/User");

// Get all users with details (without count)
exports.getTotalUsers = async (req, res) => {
  try {
    const users = await User.find({}, "first_name last_name email user_role");

    const formattedUsers = users.map((user) => ({
      user_id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      user_role: user.user_role,
    }));

    res.json({
      users: formattedUsers,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
