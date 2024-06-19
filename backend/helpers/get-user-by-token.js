const jwt = require("jsonwebtoken")

const User = require("../models/User")

const getUserByToken = async (token) => {
  if(!token) {
    return res.status(401).json({message: "Token not provided"})
  }

  const decoded = jwt.verify(token, "nossosecret")

  const user = await User.findById(decoded.id)

  return user
}

module.exports = getUserByToken