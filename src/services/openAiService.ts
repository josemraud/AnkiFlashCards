import axios from "axios";
import dotenv from "dotenv";
import { Flashcard } from "../models/flashcardModel";
import { generateAudio } from "./textToSpeechService";

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function generateFlashcard(word: string): Promise<Flashcard | null> {
    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are an expert in European Portuguese language learning." },
                    { role: "user", content: `Generate an Anki flashcard for '${word}' including pronunciation, definition, and example sentence.` }
                ]
            },
            {
                headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" }
            }
        );

        // Log the raw response content for debugging
        console.log("OpenAI response:", response.data);

        const content = response.data.choices[0]?.message?.content;
        if (!content) {
            throw new Error("No content returned from OpenAI API");
        }

        // Log the content to see its structure
        console.log("Response content:", content);

        // Manually extract the flashcard data from the string
        const flashcard: Flashcard = {
            word: word,
            pronunciation: extractField(content, "Pronunciation"),
            definition: extractField(content, "Definition"),
            example_sentence: extractField(content, "Example Sentence"),
            sentence_translation: extractField(content, "Translation:"),
            notes: "", // Assuming no notes were provided in the example
        };

        // Generate audio for pronunciation
        flashcard.audio_european = await generateAudio(word, "pt");
        flashcard.audio_brazilian = await generateAudio(word, "pt-BR");

        return flashcard;
    } catch (error: any) {
        console.error("Error generating flashcard:", error.response?.data || error.message || error);
        return null;
    }
}

// Helper function to extract a field value from the content string
function extractField(content: string, fieldName: string): string {
    // Escape the fieldName to make sure any special characters are handled correctly
    const regex = new RegExp(`${fieldName}:\\s*(.*?)\\n`);
    const match = content.match(regex);
    return match ? match[1].trim() : "";
}

