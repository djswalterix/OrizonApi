const User = require("../model/user.model"); // Make sure the path is correct

// Function to create a new user
exports.createUser = async (req, res) => {
  try {
    //console.log("create user");
    const { name, surname, email } = req.body;
    if (!email) {
      throw new Error("Email not provided correctly");
    }
    //console.log("create user" + req.body);
    const newUser = new User({ name, surname, email });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create the user." });
  }
};

// Function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log("get all users");
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve users." });
  }
};

// Function to get a user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve the user." });
  }
};

// Function to update a user by email
exports.updateUser = async (req, res) => {
  try {
    const emailToUpdate = req.params.email;
    const updates = req.body;
    const user = await User.findOne({ email: emailToUpdate });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // update
    if (updates.name) {
      user.name = updates.name;
    }
    if (updates.surname) {
      user.surname = updates.surname;
    }
    if (updates.email) {
      user.email = updates.email;
    }

    // Save
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the user." });
  }
};

// Function to delete a user by email
exports.deleteUser = async (req, res) => {
  try {
    console.log(req.params.email);
    const user = await User.findOneAndRemove({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the user." });
  }
};
