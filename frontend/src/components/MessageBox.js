import { useState } from 'react';
import styles from '../styles/MessageBox.module.css';

function MessageBox({handleUserInput, sendUserPrompt}) {
  const [inputValue, setInputValue] = useState('');


  const handleInputChange = (e) => {
	//handleUserInput();
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    // Logic to handle the submission of the question
    // This could be an API call or some other action
	if (inputValue) {
		sendUserPrompt(inputValue);
		console.log('sent user prompt:', inputValue);
	}
    console.log('Submitted:', inputValue);
    // Reset input after submit
    setInputValue('');
  };

	return (
		<div className={styles.inputGroup} onClick={handleUserInput}>
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
