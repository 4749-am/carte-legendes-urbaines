// backend/src/controllers/authController.js

import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé.' })
    }

    const newUser = new User({ username, email, password })
    await newUser.save()

    // Créer un token JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '3d'
    })

    res.status(201).json({ message: 'Utilisateur créé', token })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
}
