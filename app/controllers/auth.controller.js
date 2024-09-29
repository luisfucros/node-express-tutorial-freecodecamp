const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

const login = async(req, res) => {
  const {username, password} = req.body

  if (!username || !password) {
      throw new BadRequestError("Please provide email and password")
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const id = user._id

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'user created', token })
}

module.exports = {
    login
  }
