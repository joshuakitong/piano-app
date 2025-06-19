import { useEffect, useRef } from 'react';

export function usePiano() {
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      try {
        const response = await fetch(`${import.meta.env.BASE_URL}sounds/C.mp3`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBufferRef.current = audioBuffer;
      } catch (error) {
        console.error('Failed to load audio:', error);
      }
    };

    init();
  }, []);

  const playNote = (semitoneOffset) => {
    if (!audioContextRef.current || !audioBufferRef.current) return;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.playbackRate.value = Math.pow(2, semitoneOffset / 12);
    source.connect(audioContextRef.current.destination);
    source.start();
  };

  return { playNote };
}