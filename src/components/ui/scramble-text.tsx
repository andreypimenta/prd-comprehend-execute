import React, { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  isActive: boolean;
  className?: string;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, isActive, className = '' }) => {
  const [hasMovedBefore, setHasMovedBefore] = useState(false);

  useEffect(() => {
    if (isActive) {
      setHasMovedBefore(true);
    }
  }, [isActive]);
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className={`inline-block letter letter-${index + 1} ${
            isActive 
              ? `letter-${index + 1}-exit`
              : hasMovedBefore 
                ? `letter-${index + 1}-enter` 
                : ''
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