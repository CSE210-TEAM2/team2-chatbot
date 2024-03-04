import logo from '../media/img/logo.png'
import styles from '../styles/components/Header.module.css';
import NewChatButton from './NewChatButton';

function Header({createNewChat}) {
  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" />
      <div className={styles.text}>TritonHealthBot</div>
      <NewChatButton createNewChat={createNewChat}/>
    </div>
  );
}

export default Header;
