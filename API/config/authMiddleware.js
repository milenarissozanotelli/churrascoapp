const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Access denied, token missing!' });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).send({ error: 'Invalid token' });
    }
  }
};
