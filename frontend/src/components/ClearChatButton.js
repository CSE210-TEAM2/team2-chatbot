import React from 'react';
import clearChatIcon from '../media/img/clear-chat.png'
import styles from '../styles/components/NewChatButton.module.css'; // Import your CSS file

const ClearChatButton = ({clearChat}) => {
  const handleSubmit = () => {
    // Logic to handle the clearing chat history
    // This could be an API call or some other action
    clearChat();
  };

  return (
    <div className={styles.newChatButton}>
      <button onClick={handleSubmit}>
        <img src={clearChatIcon} alt="clear chat" /> 
        <p>Clear chat</p>
      </button>
    </div>
  );
};

export default ClearChatButton;
