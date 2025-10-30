const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    default: "student",
  },
  create_time: { type: Date, default: Date.now },
  user_picture: { type: Buffer },
  qualifications: { type: String, maxlength: 100 },
});

module.exports = mongoose.model("User", userSchema);
