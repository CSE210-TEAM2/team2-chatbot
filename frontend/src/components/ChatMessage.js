import styles from '../styles/components/ChatMessage.module.css';
import bot from '../media/img/icon-bot.png'
import user from '../media/img/icon-user.png'

function ChatMessage(props) {
  return (
    <div className={styles.chatMessageContainer}>
      <div class="col">
        {props.role === 'user' ?<img src={user} alt="person" /> : <img src={bot} alt="icon" />}
      </div>
      <div class="col">
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
