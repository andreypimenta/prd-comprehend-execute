import React, { useState, useEffect, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  isActive: boolean;
  className?: string;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, isActive, className = '' }) => {
  const [scrambledText, setScrambledText] = useState(text);
  
  // Mapeamento inteligente de caracteres similares visualmente
  const charMap: Record<string, string[]> = {
    'L': ['L', 'I', '1', '|', 'T', 'F', 'E', 'P'],
    'o': ['o', '0', 'O', 'Q', 'C', 'G', 'D'],
    'l': ['l', 'i', '1', '|', 't', 'f', 'j'],
    // Fallback para outros caracteres
  };

  const scrambleLetter = useCallback((originalChar: string) => {
    // Chance maior de mostrar a letra original (75%)
    if (Math.random() < 0.75) {
      return originalChar;
    }
    
    // Usar caracteres similares se disponível, senão usar fallback
    const similarChars = charMap[originalChar] || [originalChar, originalChar.toUpperCase(), originalChar.toLowerCase()];
    return similarChars[Math.floor(Math.random() * similarChars.length)];
  }, []);

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
          newText[index] = scrambleLetter(char);
          return newText.join('');
        });
      }, 80 + Math.random() * 120); // Interval mais rápido entre 80-200ms

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