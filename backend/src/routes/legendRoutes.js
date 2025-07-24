import express from "express";
import { getLegends } from "../controllers/legendController.js";

const router = express.Router();

// GET /api/legends → récupère toutes les légendes
router.get("/", getLegends);

export default router;
