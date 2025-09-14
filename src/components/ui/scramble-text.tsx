import React from 'react';

interface ScrambleTextProps {
  text: string;
  isActive: boolean;
  className?: string;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, isActive, className = '' }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className={`inline-block letter letter-${index + 1} ${
            isActive ? `letter-${index + 1}-exit` : ''
          }`}
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default ScrambleText;