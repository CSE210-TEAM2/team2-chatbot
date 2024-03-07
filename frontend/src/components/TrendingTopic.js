import styles from '../styles/components/TrendingTopic.module.css';

function TrendingTopic({sendUserPrompt}) {
  const handleClick = (topic) => {
    var prompt = "";
    if (topic === "Wellness") {
      prompt = "What are some tips for wellness?";
    }
    else if (topic === "Anxiety") {
      prompt = "What are some tips for anxiety?"
    }
    else if (topic === "CAPS") {
      prompt = "Can you give me information about CAPS?"
    }
    sendUserPrompt(prompt);
  };

  return (
    <div className={styles.trendingTopic}>
      <button className={styles.topicButton} onClick={() => handleClick("Wellness")}>Wellness</button>
      <button className={styles.topicButton} onClick={() => handleClick("Anxiety")}>Anxiety</button>
      <button className={styles.topicButton} onClick={() => handleClick("CAPS")}>CAPS</button>
    </div>
  );
}

export default TrendingTopic;
