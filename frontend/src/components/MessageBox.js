import { useState } from 'react';
import styles from '../styles/MessageBox.module.css';

function MessageBox() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    // Logic to handle the submission of the question
    // This could be an API call or some other action
    console.log('Submitted:', inputValue);
    // Reset input after submit
    setInputValue('');
  };

	return (
		<div className={styles.inputGroup}>
			<input
        		className={styles.inputField}
		        type="text"
		        value={inputValue}
		        onChange={handleInputChange}
		        placeholder="Message TritonHealthBot..."
		      />
      		<button className={styles.sendButton} onClick={handleSubmit}>&#x21E7;</button>
		</div>
	);
}

export default MessageBox;
