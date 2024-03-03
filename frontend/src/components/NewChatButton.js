import React from 'react';
import newChat from '../media/img/new-chat.png'
import styles from '../styles/components/NewChatButton.module.css'; // Import your CSS file

const handleSubmit = () => {
  // Logic to handle the clearing chat history
  // This could be an API call or some other action
  
};

const NewChatButton = () => {
  return (
    <div className={styles.newChatButton}>
      <button onClick={handleSubmit}>
        <p>New chat</p>
        <img src={newChat} alt="new chat" /> 
      </button>
    </div>
  );
};

export default NewChatButton;
