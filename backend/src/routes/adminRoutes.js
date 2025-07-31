import express from 'express'
import Legend from '../models/Legend.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router()

// ✅ Voir les légendes en attente (admin seulement)
router.get('/pending', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Accès interdit' })

  const pending = await Legend.find({ validated: false })
  res.json(pending)
})

// ✅ Valider une légende
router.post('/validate/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Accès interdit' })

  await Legend.findByIdAndUpdate(req.params.id, { validated: true })
  res.json({ message: 'Légende validée' })
})

export default router
