import { useState } from 'react';
import styles from '../styles/components/MessageBox.module.css';

function MessageBox({sendUserPrompt}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // Logic to handle the submission of the question
    // This could be an API call or some other action
		if (inputValue) {
			sendUserPrompt(inputValue);
		}
    // Reset input after submit
    setInputValue('');
  };

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			handleSubmit();
		}
	}

	return (
		<div className={styles.inputGroup}>
			<input
				className={styles.inputField}
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				placeholder="Message TritonHealthBot..."
			/>
			<button className={styles.sendButton} onClick={handleSubmit}>&#x21E7;</button>
		</div>
	);
}

export default MessageBox;
