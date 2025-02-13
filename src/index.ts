import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import flashcardRoutes from "./routes/flashcardRoutes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/audio", express.static(path.join(__dirname, "../public/audio")));
app.use("/flashcards", flashcardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
