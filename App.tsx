
import React, { useState, useEffect } from 'react';
import { Heart, Stars, ChevronDown } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import Reasons from './components/Reasons';
import Countdown from './components/Countdown';
import { LOVE_LETTER } from './constants';

const App: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [willBeMine, setWillBeMine] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noButtonVisible, setNoButtonVisible] = useState(true);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 'auto', left: 'auto' });
  
  // Typing Effect Logic
  useEffect(() => {
    if (unlocked) {
      let i = 0;
      const timer = setInterval(() => {
        setTypedText(LOVE_LETTER.slice(0, i));
        i++;
        if (i > LOVE_LETTER.length) clearInterval(timer);
      }, 30);
      return () => clearInterval(timer);
    }
  }, [unlocked]);

  const handleUnlock = () => {
    setUnlocked(true);
    // Smooth scroll to next section
    setTimeout(() => {
      document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const moveNoButton = () => {
    // Generate a random position that stays mostly within the viewport
    const randomX = Math.random() * 60 + 20; // 20% to 80%
    const randomY = Math.random() * 60 + 20; // 20% to 80%
    setNoButtonPosition({ 
      top: `${randomY}%`, 
      left: `${randomX}%` 
    });
  };

  const handleNoClick = () => {
    // If they actually manage to click it, make it vanish
    setNoButtonVisible(false);
  };

  const handleYes = () => {
    setAccepted(true);
  };

  const openFinalQuestion = () => {
    setShowSecret(false);
    setWillBeMine(true);
  };

  return (
    <div className="min-h-screen selection:bg-pink-200 selection:text-pink-700 bg-[#fff5f7]">
      <FloatingHearts />
      <MusicPlayer />

      {/* Hero Section */}
      {!unlocked ? (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-red-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="absolute top-20 left-1/4 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
             <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-red-200 rounded-full blur-3xl"></div>
          </div>
          
          <div className="text-center z-10 px-4">
            <Heart className="mx-auto text-pink-500 w-20 h-20 animate-pulse mb-6" fill="currentColor" />
            <h1 className="text-5xl md:text-7xl font-romantic text-pink-600 mb-6 drop-shadow-sm">
              Happy Valentine's Day My Love ❤️
            </h1>
            <p className="text-gray-500 text-lg mb-12 max-w-lg mx-auto italic font-light">
              I've prepared a small surprise for you to show how much I appreciate every single moment we've shared.
            </p>
            <button
              onClick={handleUnlock}
              className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full text-xl font-medium shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 group flex items-center gap-2 mx-auto"
            >
              Click to see my surprise
              <Stars className="group-hover:rotate-12 transition-transform" size={24} />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Love Letter Section */}
          <section id="letter" className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10">
            <div className="max-w-2xl w-full bg-white/70 backdrop-blur-md p-10 md:p-16 rounded-[40px] shadow-2xl border border-white/50 relative">
               <div className="absolute -top-10 -left-10 text-pink-200 opacity-50 rotate-[-15deg]">
                 <Heart size={120} fill="currentColor" />
               </div>
               <div className="absolute -bottom-10 -right-10 text-pink-200 opacity-50 rotate-[15deg]">
                 <Heart size={80} fill="currentColor" />
               </div>
               
               <h2 className="text-4xl font-romantic text-pink-600 mb-8 border-b border-pink-100 pb-4 text-center md:text-left">A Letter to You</h2>
               <div className="font-handwriting text-2xl md:text-3xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                 {typedText}
                 {typedText.length < LOVE_LETTER.length && (
                   <span className="inline-block w-1 h-8 bg-pink-400 ml-1 animate-pulse"></span>
                 )}
               </div>
            </div>
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => document.getElementById('reasons')?.scrollIntoView({behavior: 'smooth'})}>
              <ChevronDown className="text-pink-400" size={40} />
            </div>
          </section>

          {/* Reasons Section */}
          <div id="reasons">
            <Reasons />
          </div>

          {/* Countdown Section */}
          <Countdown />

          {/* Surprise Section */}
          <section className="py-32 flex flex-col items-center justify-center relative z-10 bg-pink-50/30 overflow-hidden">
            <h2 className="text-4xl font-romantic text-pink-600 mb-12 text-center px-4">There is still one final secret...</h2>
            
            <button
              onClick={() => setShowSecret(true)}
              className="bg-white text-pink-500 border-2 border-pink-500 px-12 py-5 rounded-full text-2xl font-cute hover:bg-pink-500 hover:text-white transition-all shadow-xl hover:shadow-pink-200/50"
            >
              Click for a Secret Message 💌
            </button>

            {showSecret && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 bg-black/60 backdrop-blur-md transition-all">
                <div className="bg-white p-10 md:p-16 rounded-[50px] shadow-2xl text-center max-w-md transform scale-100 opacity-100 transition-transform">
                  <Heart className="mx-auto text-red-500 w-24 h-24 mb-6" fill="currentColor" />
                  <h3 className="text-4xl font-romantic text-red-600 mb-6 leading-tight">"You are my favorite person in the world forever ❤️"</h3>
                  <p className="text-gray-500 italic mb-10 text-lg">Are you ready for the most important question?</p>
                  <button 
                    onClick={openFinalQuestion}
                    className="bg-pink-500 text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-pink-600 shadow-lg transition-transform active:scale-95 w-full"
                  >
                    I'm Ready! ✨
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Footer */}
          <footer className="py-20 text-center relative z-10">
            <p className="text-gray-400 italic mb-4">Crafted with all my love, specifically for you</p>
            <p className="text-pink-300">© 2024 Your Forever Valentine</p>
          </footer>
        </>
      )}

      {/* Final Modal (Yes/No Proposal) */}
      {willBeMine && (
        <div className="fixed inset-0 z-[120] bg-pink-600/95 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white p-10 md:p-14 rounded-[50px] shadow-2xl text-center max-w-xl relative min-h-[450px] flex flex-col justify-center items-center overflow-hidden w-full">
             {!accepted ? (
               <>
                 <div className="flex justify-center gap-2 mb-8">
                   <Heart className="text-pink-500 animate-bounce" fill="currentColor" />
                   <Heart className="text-pink-400 animate-bounce delay-100" fill="currentColor" />
                   <Heart className="text-pink-300 animate-bounce delay-200" fill="currentColor" />
                 </div>
                 <h2 className="text-5xl md:text-6xl font-romantic text-pink-600 mb-10 leading-tight px-4">Will you be mine forever? 💕</h2>
                 
                 <div className="flex flex-wrap justify-center gap-8 relative w-full min-h-[100px] items-center">
                    <button 
                      onClick={handleYes}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-16 py-5 rounded-full text-3xl font-cute shadow-xl transition-all hover:scale-110 z-10 active:scale-90"
                    >
                      Yes!
                    </button>
                    
                    {noButtonVisible && (
                      <button 
                        onMouseEnter={moveNoButton}
                        onClick={handleNoClick}
                        style={{
                          position: noButtonPosition.top === 'auto' ? 'relative' : 'fixed',
                          top: noButtonPosition.top,
                          left: noButtonPosition.left,
                          transition: 'all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          zIndex: 20
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-500 px-12 py-5 rounded-full text-2xl font-cute shadow-lg"
                      >
                        No
                      </button>
                    )}
                 </div>
                 <p className="mt-12 text-gray-400 italic text-base">
                   {noButtonVisible ? "(Psst... the 'No' button is feeling a bit shy today! 😜)" : "(Exactly! 'No' wasn't really an option! ❤️)"}
                 </p>
               </>
             ) : (
               <div className="animate-in fade-in zoom-in duration-700">
                 <div className="flex justify-center mb-8 relative">
                   <Heart className="text-red-500 w-36 h-36 animate-[ping_2s_infinite_ease-in-out] absolute opacity-30" fill="currentColor" />
                   <Heart className="text-red-500 w-36 h-36 relative z-10" fill="currentColor" />
                 </div>
                 <h2 className="text-6xl font-romantic text-pink-600 mb-6 leading-tight">YOU SAID YES! ❤️</h2>
                 <p className="text-2xl md:text-3xl font-handwriting text-gray-700 leading-relaxed mb-8 px-4">
                   You've just made me the happiest person in the universe! I promise to love you, cherish you, and go on countless adventures with you. My heart is yours, today and for all the tomorrows to come. ✨
                 </p>
                 <button 
                  onClick={() => setWillBeMine(false)}
                  className="bg-pink-500 text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-pink-600 transition-all shadow-lg active:scale-95"
                 >
                   I Love You So Much! ❤️
                 </button>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
