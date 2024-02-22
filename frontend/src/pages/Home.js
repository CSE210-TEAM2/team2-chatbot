import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import InstructionMessage from '../components/InstructionMessage';
import ChatHistory from '../components/ChatHistory';
import MessageBox from '../components/MessageBox';
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';

export default function Home() {

  // used to hide placeholder messages
  const [isTyping, setIsTyping] = useState(false);
  const [userPrompts, setUserPrompts] = useState([]);

  const handleUserInput = (e) => {
    if (!isTyping) {setIsTyping(true);}
  };

  const sendUserPrompt = (promptText) => {
    const newPrompt = { 
      role:"user",
      text:promptText
    }; // Create a new message object
    console.log(newPrompt);
    setUserPrompts([...userPrompts, newPrompt]); // Add the new message to the state
  };

  return (
	<div className={styles.container}>
		<Header />
      
		{!isTyping && <InstructionMessage />}
    
		<ChatHistory userPrompts={userPrompts} />

	    <MessageBox handleUserInput={handleUserInput} sendUserPrompt={sendUserPrompt}/>
    </div>
  );
}

