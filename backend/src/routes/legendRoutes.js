import express from "express";
import { getLegends } from "../controllers/legendController.js";
import authMiddleware from '../middlewares/auth.js';
import Legend from "../models/Legend.js";

const router = express.Router();

router.get("/", getLegends);

// ✅ Ajouter une légende
router.post('/', authMiddleware, async (req, res) => {
  const isAdmin = req.user.role === 'admin';

  const newLegend = new Legend({
    ...req.body,
    validated: isAdmin,
    createdBy: req.user.id
  });

  await newLegend.save();
  res.status(201).json({
    message: isAdmin ? 'Légende ajoutée et validée' : 'Légende en attente de validation'
  });
});

// ✅ Récupérer les légendes en attente (admin)
router.get('/admin/pending-legends', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Accès refusé" });
  }

  const pending = await Legend.find({ validated: false });
  res.json(pending);
});

// ✅ Valider une légende
router.patch('/:id/validate', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Accès refusé" });
  }

  await Legend.findByIdAndUpdate(req.params.id, { validated: true });
  res.json({ message: 'Légende validée' });
});

export default router;
