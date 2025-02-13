export interface Flashcard {
    word: string;
    pronunciation: string;
    definition: string;
    example_sentence: string;
    sentence_translation: string;
    notes: string;
    audio_european?: string;
    audio_brazilian?: string;
}
