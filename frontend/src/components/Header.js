import logo from '../media/img/logo.png'
import styles from '../styles/components/Header.module.css';
import ClearChatButton from './ClearChatButton';

function Header({clearChat}) {
  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" />
      <div className={styles.text}>TritonHealthBot</div>
      <ClearChatButton clearChat={clearChat}/>
    </div>
  );
}

export default Header;
