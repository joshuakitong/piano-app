import { useRef, useEffect } from 'react';

export function usePiano(sustain = false, volume = 1, transpose = 0) {
  const audioCtxRef = useRef(null);

  useEffect(() => {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  const playNote = (offset) => {
    const context = audioCtxRef.current;
    const source = context.createBufferSource();
    const gainNode = context.createGain();
    gainNode.gain.value = volume;

    const file = sustain ? '/piano-app/sounds/C_sustained.mp3' : '/piano-app/sounds/C.mp3';

    fetch(file)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        source.buffer = audioBuffer;
        const finalOffset = offset + transpose;
        source.playbackRate.value = Math.pow(2, finalOffset / 12);
        source.connect(gainNode);
        gainNode.connect(context.destination);
        source.start(0);
      });
  };

  return { playNote };
}