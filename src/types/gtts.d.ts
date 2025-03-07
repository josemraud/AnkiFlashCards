declare module 'gtts' {
    class gTTS {
      constructor(text: string, lang?: string);
      save(filepath: string, callback: (err: any) => void): void;
      stream(callback: (err: any, audioStream: any) => void): void;
    }
    export = gTTS;
  }
  