import React from 'react';
import styles from '../styles/components/ChatbotLoading.module.css'; // Import your CSS file

const ChatbotLoading = () => {
  return (
    <div className={styles.chatbotLoading}>
      <div className={styles.loadingAnimation}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};

export default ChatbotLoading;
