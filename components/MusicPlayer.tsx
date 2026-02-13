
import React, { useState, useRef } from 'react';
import { Music, Music2, Pause, Play } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className="bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-lg border border-pink-200 text-pink-500 hover:scale-110 transition-transform active:scale-95"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder romantic-ish music
      />
    </div>
  );
};

export default MusicPlayer;
