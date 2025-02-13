import gTTS from "gtts";
import fs from "fs";
import path from "path";

export async function generateAudio(word: string, accent: "pt" | "pt-BR"): Promise<string> {
    return new Promise((resolve, reject) => {
        const tts = new gTTS(word, accent);
        const fileName = `${word}_${accent}.mp3`;
        const filePath = path.join(__dirname, "../../public/audio", fileName);

        tts.save(filePath, (err) => {
            if (err) return reject(err);
            resolve(`/audio/${fileName}`);
        });
    });
}
