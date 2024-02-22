import Header from '../components/Header';
import InstructionMessage from '../components/InstructionMessage';
import ChatHistory from '../components/ChatHistory';
import MessageBox from '../components/MessageBox';
import styles from '../styles/pages/Home.module.css';
import React, { useState } from 'react';

export default function Home() {

  // used to hide placeholder messages
  const [userPrompts, setUserPrompts] = useState([]);

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
      
		{(userPrompts.length === 0) && <InstructionMessage />}
    
		<ChatHistory userPrompts={userPrompts} />

	    <MessageBox sendUserPrompt={sendUserPrompt}/>
    </div>
  );
}

