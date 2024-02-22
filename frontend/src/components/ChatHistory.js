import ChatMessage from '../components/ChatMessage';
import styles from '../styles/Home.module.css';

export default function ChatHistory({userPrompts}) {
	return (
      <div className={styles.chatContainer2}> 
        {userPrompts.map(prompt => (
          <ChatMessage role={prompt.role} text={prompt.text} />
        ))}
      </div>
	);
}
		
