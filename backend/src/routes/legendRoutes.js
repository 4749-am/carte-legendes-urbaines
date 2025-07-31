import express from "express";
import { getLegends } from "../controllers/legendController.js";
import authMiddleware from '../middlewares/auth.js';
import Legend from "../models/Legend.js";

const router = express.Router();

// GET /api/legends → récupère toutes les légendes
router.get("/", getLegends);


router.post('/', authMiddleware, async (req, res) => {
  // ici, req.user contient les infos du token
  const newLegend = new Legend({
    ...req.body,
    validated: false, // marquer comme non validée par défaut
    createdBy: req.user.id
  })

  await newLegend.save()
  res.status(201).json({ message: 'Légende en attente de validation' })
})

export default router;
