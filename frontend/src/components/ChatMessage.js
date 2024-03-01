import bot from '../media/img/icon-bot.png'
import user from '../media/img/icon-user.png'
import ChatbotLoading from './ChatbotLoading';
import styles from '../styles/components/ChatMessage.module.css';

function ChatMessage(props) {
  return (
    <div className={styles.chatMessageContainer}>
      {props.role === 'user' ? <img src={user} alt="person" /> : <img src={bot} alt="icon" />}
      <div>
        {props.role === 'user' ? <strong>You</strong> : <strong>TritonHealthBot</strong>}
        {
          (() => {
            if (props.status === 'error') {
              return <p className={styles.error}>{props.text}</p>;
            } else if (props.status === 'loading') {
              return <ChatbotLoading />;
            } else if (props.role === 'user') {
              return <p>{props.text}</p>
            } else if (props.role === 'bot') {
              console.log(props);
              return (
                <div>
                  <p>{props.text}</p>
                    {props.sources.map(source => (
                    <div>
                      <p>{source.metadata.source}</p>
                    </div>
                    ))}	
                </div>
                );
            }
          })()
        }
      </div>
    </div>
  );
}

export default ChatMessage;
