const User = require('../models/user.model');

const createUser = async (req, res) => {
    const { username, password } = req.body;
  
    // const { error } = userSchema.validate({ username, password });
    // if (error) {
    //   return res.status(400).json({ error: error.details[0].message });
    // }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    const user = await User.create(req.body);

    res.status(201).json({ user });
  };

const getUsers = async (req, res) => {
  const users = await User.find({})
  res.status(201).json({ users })
}

module.exports = { createUser, getUsers };
