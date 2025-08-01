import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import authMiddleware from '../middlewares/auth.js';

dotenv.config(); // Assure-toi que .env est chargé

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('❌ JWT_SECRET est manquant dans le fichier .env');
}

// 🔒 Générer un token
function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '7d'
  });
}

// ✅ Inscription : POST /api/users/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email et mot de passe requis' });

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Utilisateur déjà existant' });

    const user = await User.create({ email, password });
    const token = generateToken(user);
    res.status(201).json({ message: 'Inscription réussie', token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ Connexion : POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email et mot de passe requis' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ Obtenir les infos de l'utilisateur connecté : GET /api/users/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password') // sans mot de passe
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
});

export default router;
