const User = require("../models/User")

const bcrypt = require("bcrypt")

module.exports = class UserController {


  static async register (req, res) {
    const {name, email, phone, password, confirmPassword} = req.body

    if(!name) {
      res.status(422).json({message: "Name is required"})
      return
    }

    if(!email) {
      res.status(422).json({message: "Email is required"})
      return
    }

    if(!phone) {
      res.status(422).json({message: "Phone is required"})
      return
    }

    if(!password) {
      res.status(422).json({message: "Password is required"})
      return
    }

    if(!confirmPassword) {
      res.status(422).json({message: "Confirm password is required"})
      return
    }

    if(password !== confirmPassword) { 
      res.status(422).json({message: "Passwords don't match"})
      return
    }

    //check if user exists
    const userExists = await User.findOne({email: email})

    if(userExists) {
      res.status(422).json({message: "Email already in use"})
      return
    }

    //create a password hash
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //create a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash
    })

      try {

        const savedUser = await user.save()
        res.status(201).json({message: "User created successfully", savedUser})

      } catch (error) {
        res.status(500).json({message: error})
      }
  
    
  }
}