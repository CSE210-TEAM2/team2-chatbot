import React from 'react';
import clearChat from '../media/img/clear-chat.png'
import styles from '../styles/components/NewChatButton.module.css'; // Import your CSS file

const NewChatButton = ({createNewChat}) => {
  const handleSubmit = () => {
    // Logic to handle the clearing chat history
    // This could be an API call or some other action
    createNewChat();
  };

  return (
    <div className={styles.newChatButton}>
      <button onClick={handleSubmit}>
        <img src={clearChat} alt="clear chat" /> 
        <p>Clear chat</p>
      </button>
    </div>
  );
};

export default NewChatButton;
