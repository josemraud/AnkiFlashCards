import { Request, Response, RequestHandler } from "express";
import { generateFlashcard } from "../services/openAiService";

export const getFlashcard: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { word } = req.body;
    if (!word) {
        res.status(400).json({ error: "Word is required" });
        return;
    }
    try {
        const flashcard = await generateFlashcard(word);
        if (!flashcard) {
            res.status(500).json({ error: "Failed to generate flashcard" });
            return;
        }
        res.json({ flashcard });
    } catch (error) {
        console.error("Error generating flashcard:", error);
        res.status(500).json({ error: "An unexpected error occurred while generating the flashcard" });
    }
};
