const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ===================== Signup =====================
exports.signup = async (req, res) => {
  try {
    const { email, password, first_name, last_name, user_role, qualifications } = req.body;

    // Validate required fields
    if (!email || !password || !first_name || !last_name || !user_role || !qualifications) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user (Mongo already gives _id, no need for Date.now())
    const newUser = new User({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      user_role,
      qualifications
    });

    await newUser.save();
    const user = await User.findOne({ email });
    const token = jwt.sign(
      { userId: user._id, role: user.user_role }, // use Mongo _id
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // 1 day instead of 1h
    );
    res.status(201).json({
      msg: "User registered successfully", token,
      role: user.user_role,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===================== Login =====================
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.user_role }, // use Mongo _id
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // 1 day instead of 1h
    );

    // Send token + basic user info
    res.json({
      msg: "Login successful",
      token,
      role: user.user_role,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
