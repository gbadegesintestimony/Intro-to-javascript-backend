import { User } from "../models/user_model.js";

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // basic validation

    if (!name || !username || !email || !password) {
      return res.status(400).json({ messages: "All fields are required!" });
    }

    // Validate password length BEFORE hashing

    if (password.length < 8 || password.length > 50) {
      return res.status(400).json({
        message: "Password must be between 8 and 50 characters",
      });
    }

    // check if user exists already

    const existing = await User.findOne({ name, email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "user already exist" });
    }

    // create user

    const user = await User.create({
      name,
      username,
      email: email.toLowerCase(),
      password,
    });

    res.status(201).json({
      message: "User Registered successfully",
      user: {
        name: user.name,
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "enter login details" });
    }

    // checking if user already exist

    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!user) {
      return res.status(404).json({ message: "user does not exist " });
    }

    //compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "wrong password" });
    }

    res.status(201).json({
      message: "user loggedIn successfully",
      user: {
        email: user.email,
        id: user._id,
        username: user.username,
        name: user.name,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Log out successful",
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { registerUser, loginUser, logoutUser };
