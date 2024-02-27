import TrendingTopic from './TrendingTopic';
import icon from '../media/img/icon-bot.png'
import styles from '../styles/components/WelcomeMessage.module.css';

function WelcomeMessage() {
  return (
    <div className={styles.welcomeMessage}>
      <img src={icon} alt="Icon" />
      <p>Welcome to the TritonHealthBot! Please ask me any questions about UCSD health resources!</p>
      <h3>Trending Topics</h3>
      <TrendingTopic />
    </div>
  );
}

export default WelcomeMessage;
