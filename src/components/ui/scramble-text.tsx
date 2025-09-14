import React, { useState, useEffect, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  isActive: boolean;
  className?: string;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, isActive, className = '' }) => {
  const [scrambledText, setScrambledText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  const scrambleLetter = useCallback((originalChar: string, position: number) => {
    // Chance maior de mostrar a letra original (60%)
    if (Math.random() < 0.6) {
      return originalChar;
    }
    // 40% chance de mostrar caractere aleatório
    return chars[Math.floor(Math.random() * chars.length)];
  }, [chars]);

  useEffect(() => {
    if (!isActive) {
      setScrambledText(text);
      return;
    }

    const intervals: NodeJS.Timeout[] = [];

    // Criar interval para cada letra com timing diferente
    text.split('').forEach((char, index) => {
      const interval = setInterval(() => {
        setScrambledText(prev => {
          const newText = prev.split('');
          newText[index] = scrambleLetter(char, index);
          return newText.join('');
        });
      }, 100 + Math.random() * 200); // Interval entre 100-300ms para cada letra

      intervals.push(interval);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [text, isActive, scrambleLetter]);

  return (
    <span className={className}>
      {scrambledText.split('').map((char, index) => (
        <span key={index} className="inline-block">
          {char}
        </span>
      ))}
    </span>
  );
};

export default ScrambleText;