import React, { useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import styles from '../styles/components/ChatHistory.module.css';

export default function ChatHistory({userPrompts}) {

  useEffect(()=> document.getElementById("anchor").scrollIntoView({behavior: "smooth", block:"end"}), [userPrompts]);

	return (
    <div className={styles.chatHistory}>
      <div id="anchor">
        {userPrompts.map(prompt => (
          <ChatMessage role={prompt.role} text={prompt.text} status={prompt.status} />
        ))}
      </div>
    </div>
	);
}
