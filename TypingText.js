// TypingText.js
import React, { useState, useEffect, useRef } from 'react';
import { Text } from 'react-native';

const TypingText = ({ text, speed = 5, style }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedText((prev) => {
        const nextText = prev + text[indexRef.current];
        indexRef.current++;
        if (indexRef.current === text.length) {
          clearInterval(timer);
        }
        return nextText;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <Text style={style}>{displayedText}</Text>;
};

export default TypingText;
