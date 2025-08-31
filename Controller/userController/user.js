const User = require("../../models/user.model");

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    if (result.length === 0) {
      return res.status(200).json({ message: "No users available now" });
    }
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// update user activity 
exports.updateUserIsOnlineStatus = async (req, res) => {
  try {
    const { email, isOnline, lastSignInTime } = req.body;
    const result = await User.findOneAndUpdate(
      { email },
      { lastSignInTime, isOnline },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated", data: result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// add a user
exports.createUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    const result = await newUser.save();
    res.status(201).json({ message: "User created successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get active users
exports.getActiveUser = async (req, res) => {
  try {
    const result = await User.find({ isOnline: true });
    if (result.length === 0) {
      return res.status(200).json({ message: "No active users found" });
    }
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get deactive users
exports.getDeactiveUser = async (req, res) => {
  try {
    const result = await User.find({ isOnline: false });
    if (result.length === 0) {
      return res.status(200).json({ message: "No deactive users found" });
    }
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get user by id
exports.getUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findById(id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
