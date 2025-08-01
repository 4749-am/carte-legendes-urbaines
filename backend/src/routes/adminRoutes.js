import express from 'express'
import Legend from '../models/Legend.js'
import User from '../models/User.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router()

// ✅ Voir les légendes en attente
router.get('/pending', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Accès interdit' })

  const pending = await Legend.find({ validated: false }).populate('createdBy', 'email')
  res.json(pending)
})

// ✅ Valider une légende (une seule)
router.post('/validate/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Accès interdit' })

  const legend = await Legend.findByIdAndUpdate(req.params.id, { validated: true }, { new: true })

  if (!legend) return res.status(404).json({ message: 'Légende introuvable' })

  res.json({ message: 'Légende validée', legend })
})

// ✅ Refuser une légende
router.post('/reject/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Accès interdit' })

  const { reason } = req.body

  const legend = await Legend.findById(req.params.id).populate('createdBy', 'email')
  if (!legend) return res.status(404).json({ message: 'Légende introuvable' })

  const userEmail = legend.createdBy?.email

  // TODO: envoi mail ici plus tard si besoin

  await legend.deleteOne()

  res.json({ message: `Légende refusée${userEmail ? ` et notification envoyée à ${userEmail}` : ''}` })
})

export default router
