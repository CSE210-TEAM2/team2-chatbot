import bot from '../media/img/icon-bot.png'
import user from '../media/img/icon-user.png'
import styles from '../styles/components/ChatMessage.module.css';

function ChatMessage(props) {
  return (
    <div className={styles.chatMessageContainer}>
      {props.role === 'user' ? <img src={user} alt="person" /> : <img src={bot} alt="icon" />}
      <div>
        {props.role === 'user' ? <strong>You</strong> : <strong>TritonHealthBot</strong>}
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
