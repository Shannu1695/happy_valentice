
import React from 'react';
import { REASONS } from '../constants';

const Reasons: React.FC = () => {
  return (
    <section className="py-20 bg-pink-50/50 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-romantic text-pink-600 text-center mb-16">Reasons Why I Love You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, index) => (
            <div 
              key={reason.id}
              className="bg-white p-8 rounded-3xl shadow-md border-b-4 border-pink-200 hover:border-pink-500 transform hover:-rotate-2 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">
                {reason.emoji}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                <span className="text-pink-400 font-bold mr-2">#{index + 1}</span>
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reasons;
