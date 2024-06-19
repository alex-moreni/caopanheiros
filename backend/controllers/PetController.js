const Pet = require("../models/Pet")

const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class PetController {
  static async create(req, res) {
    const {name, age, weight, color} = req.body

    const available = true

    //images Upload


    //validations
    if(!name) {
      res.status(422).json({message: "Name is required"})
      return
    }

    if(!age) {
      res.status(422).json({message: "Age is required"})
      return
    }

    if(!weight) {
      res.status(422).json({message: "Weight is required"})
      return
    }

    if(!color) {
      res.status(422).json({message: "Color is required"})
      return
    }

    //get pet owner
    const token = getToken(req)
    const user = await getUserByToken(token)

    //create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user.id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      }
    })

    try {
      const newPet = await pet.save()
      res.status(201).json({message: "Pet created", newPet})

    } catch (error) {
      return res.status(500).json({message: error})
    }
  }
}