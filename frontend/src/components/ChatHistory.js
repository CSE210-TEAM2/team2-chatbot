import ChatMessage from '../components/ChatMessage';
import styles from '../styles/ChatHistory.module.css';

export default function ChatHistory({userPrompts}) {
	return (
      <div className={styles.container}> 
        {userPrompts.map(prompt => (
          <ChatMessage role={prompt.role} text={prompt.text} />
        ))}
      </div>
	);
}
		
