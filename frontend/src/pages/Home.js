import React, { useState } from 'react';
import Header from '../components/Header';
import WelcomeMessage from '../components/WelcomeMessage';
import ChatHistory from '../components/ChatHistory';
import MessageBox from '../components/MessageBox';
import styles from '../styles/pages/Home.module.css';

export default function Home() {

  // used to hide placeholder messages
  const [userPrompts, setUserPrompts] = useState([]);

  const sendUserPrompt = (promptText) => {
    const newPrompt = { 
      role:"user",
      text:promptText,
    }; // Create a new message object

		let response = {
			role:"bot",
			text:"",
		};
		
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newPrompt)
		};

		fetch('/fake', options).then(res => res.json()).then(data => {
			response.text = data.text;
			// console.log(newPrompt);
			setUserPrompts(userPrompts.concat([newPrompt, response])); // Add the new message to the state console.log(data);
		});
  };

  return (
		<div className={styles.home}>
			<Header />
			<div className={styles.body}>
				{(userPrompts.length === 0) ? <WelcomeMessage /> : <ChatHistory userPrompts={userPrompts} />}
				<MessageBox sendUserPrompt={sendUserPrompt}/>
			</div>
		</div>
  );
}
