import styles from '../styles/components/TrendingTopic.module.css';

function TrendingTopic() {
  return (
      <div className={styles.trendingTopics}>
        <button className={styles.topicButton}>Counseling</button>
        <button className={styles.topicButton}>Workshops</button>
        <button className={styles.topicButton}>Anxiety</button>
      </div>
  );
}

export default TrendingTopic;
