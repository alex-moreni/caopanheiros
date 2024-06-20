const Pet = require("../models/Pet")

const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectID = require("mongoose").Types.ObjectId

module.exports = class PetController {
  static async create(req, res) {
    const {name, age, weight, color} = req.body

    const images = req.files

    const available = true

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

    if(images.length === 0) {
      res.status(422).json({message: "Images is required"})
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

    images.map((image) => {
      pet.images.push(image.filename)
    })

    try {
      const newPet = await pet.save()
      res.status(201).json({message: "Pet created", newPet})

    } catch (error) {
      return res.status(500).json({message: error})
    }
  }

  static async getAll(req, res) {

    const pets = await Pet.find().sort("-createdAt")
    
    return res.status(200).json({pets})
  }

  static async getAllUserPets(req, res) {

    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ "user._id": user.id }).sort("-createdAt");

    return res.status(200).json({pets})

  }

  static async getAllUserAdoptions(req, res) {

    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ "adopter._id": user.id }).sort("-createdAt");

    return res.status(200).json({pets})

  }

  static async getPetById(req, res) {
    const { id } = req.params

    if(!ObjectID.isValid(id)) {
      res.status(422).json({message: "Invalid ID"})
      return
    }

    const pet = await Pet.findById(id)

    if(!pet) {
      res.status(404).json({message: "Pet not found"})
      return
    }

    return res.status(200).json({pet})

  }

  static async removePetById(req, res) {
    const { id } = req.params

    if(!ObjectID.isValid(id)) {
      res.status(422).json({message: "Invalid ID"})
      return
    }

    const pet = await Pet.findById(id)

    if(!pet) {
      res.status(404).json({message: "Pet not found"})
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.toString() !== user.id.toString()) {
      res.status(422).json({message: "Unauthorized"})
      return
    }

    await Pet.findByIdAndRemove(id)

    return res.status(200).json({message: "Pet deleted"})
  }
}