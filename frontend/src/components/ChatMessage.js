import bot from '../media/img/icon-bot.png'
import user from '../media/img/icon-user.png'
import ChatbotLoading from './ChatbotLoading';
import styles from '../styles/components/ChatMessage.module.css';

import {parse} from 'marked';

function FormatResponse(props) {
  const htmlString = parse(props.text);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      <hr />
      {props.sources.map(source => {
        const prefix = "https://github.com/CSE210-TEAM2/team2-chatbot/tree/main/backend/";
        const rp = source.metadata.source;
        const pageNumber = source.metadata.page;
        return <li><a href={prefix + rp}>{rp + ", P" + pageNumber}</a></li>;
      })}	
    </div>
  )
}

function ChatMessage(props) {
  return (
    <div className={styles.chatMessageContainer}>
      {props.role === 'user' ? 
      <img src={user} alt="person" /> : 
      <img src={bot} alt="icon" />}
      <div>
        {props.role === 'user' ? 
        <strong>You</strong> : 
        <strong>TritonHealthBot</strong>}
        {
          (() => {
            if (props.status === 'loading') {
              return <ChatbotLoading />;
            } else if (props.status === 'error') {
              return <p className={styles.error}>{props.text}</p>;
            } else { // ok
              return props.role === 'user' ? 
              <p>{props.text}</p> : 
              <FormatResponse text={props.text} sources={props.sources} />;
            }
          })()
        }
      </div>
    </div>
  );
}

export default ChatMessage;
