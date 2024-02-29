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
			status:"ok",
    }; // Create a new message object

		let response = {
			role:"bot",
			text:"",
			status:"loading",
		};
		
		setUserPrompts(userPrompts.concat([newPrompt, response]));  // display user's message while waiting for response

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newPrompt)
		};

		fetch('/chatbot', options)
		.then((res) => res.json())
		.then(data => {
			response.text = data.text;
			response.status = "ok";
			setUserPrompts(userPrompts.concat([newPrompt, response]));
		})
		.catch((err) => {
			response.text = "Sorry, I can't connect to the server right now. Please try again later.";
			response.status = "error";
			setUserPrompts(userPrompts.concat([newPrompt, response]));
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
