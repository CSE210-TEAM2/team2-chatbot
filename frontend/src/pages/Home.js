import Header from '../components/Header';
import WelcomeMessage from '../components/WelcomeMessage';
import ChatMessage from '../components/ChatMessage';
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
      
      {!isTyping && (
        <div className={styles.chatContainer1}>
          <WelcomeMessage />
          <ChatMessage
            role="user"
            text="How can I make an appointent with CAPS?"
          />
          <ChatMessage
            role="bot"
            text="To schedule your first appointment with CAPS, you can call CAPS at
            (858) 534-3755, schedule an appointment through MyStudentChart,
            or visit the Central Office at Galbraith Hall 190."
          />
        </div>
      )}
    
      <div className={styles.chatContainer2}> 
        {userPrompts.map(prompt => (
          <ChatMessage role={prompt.role} text={prompt.text} />
        ))}
      </div>

	    <MessageBox handleUserInput={handleUserInput} sendUserPrompt={sendUserPrompt}/>
    </div>
  );
}

