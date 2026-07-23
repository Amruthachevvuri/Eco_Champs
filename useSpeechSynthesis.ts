import { useRef, useCallback, useEffect } from "react";

interface SpeakOptions {
  text: string;
  speaker: "chikku" | "bittu";
  onEnd?: () => void;
}

export const useSpeechSynthesis = () => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isSpeakingRef = useRef(false);

  const getVoice = useCallback((speaker: "chikku" | "bittu") => {
    const voices = window.speechSynthesis.getVoices();
    // Filter to English voices only
    const enVoices = voices.filter((v) => v.lang.startsWith("en"));
    
    if (speaker === "chikku") {
      // Warm, friendly teacher voice - slightly deeper but still child-friendly
      return (
        enVoices.find((v) => v.name.includes("Google UK English Male")) ||
        enVoices.find((v) => v.name.includes("Daniel")) ||
        enVoices.find((v) => v.name.includes("Rishi")) ||
        enVoices.find((v) => v.name.toLowerCase().includes("male")) ||
        enVoices[0] ||
        voices[0]
      );
    } else {
      // Cheerful, high-energy kid-like voice for Bittu
      return (
        enVoices.find((v) => v.name.includes("Samantha")) ||
        enVoices.find((v) => v.name.includes("Google US English")) ||
        enVoices.find((v) => v.name.includes("Karen")) ||
        enVoices.find((v) => v.name.toLowerCase().includes("female")) ||
        enVoices[1] || enVoices[0] || voices[0]
      );
    }
  }, []);

  const speak = useCallback(({ text, speaker, onEnd }: SpeakOptions) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    const voice = getVoice(speaker);
    if (voice) utterance.voice = voice;

    if (speaker === "chikku") {
      // Lively, engaging teacher: clear but energetic for kids
      utterance.rate = 0.92;
      utterance.pitch = 1.15;
      utterance.volume = 1;
    } else {
      // Excited curious kid: higher pitch, fast, very energetic
      utterance.rate = 1.05;
      utterance.pitch = 1.5;
      utterance.volume = 1;
    }

    utterance.onend = () => {
      isSpeakingRef.current = false;
      onEnd?.();
    };

    utterance.onerror = () => {
      isSpeakingRef.current = false;
      onEnd?.();
    };

    isSpeakingRef.current = true;
    window.speechSynthesis.speak(utterance);
  }, [getVoice]);

  const cancel = useCallback(() => {
    window.speechSynthesis?.cancel();
    isSpeakingRef.current = false;
  }, []);

  useEffect(() => {
    window.speechSynthesis?.getVoices();
    const handler = () => window.speechSynthesis?.getVoices();
    window.speechSynthesis?.addEventListener("voiceschanged", handler);
    return () => {
      window.speechSynthesis?.removeEventListener("voiceschanged", handler);
      cancel();
    };
  }, [cancel]);

  return { speak, cancel, isSpeaking: isSpeakingRef };
};
