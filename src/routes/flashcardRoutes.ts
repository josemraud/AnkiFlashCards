import express from "express";
import { getFlashcard } from "../controllers/flashcardController";

const router = express.Router();
router.post("/generate", getFlashcard);

export default router;