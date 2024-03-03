import logo from '../media/img/logo.png'
import styles from '../styles/components/Header.module.css';
import NewChatButton from './NewChatButton';

function Header() {
  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" />
      <div className={styles.text}>TritonHealthBot</div>
      <NewChatButton />
    </div>
  );
}

export default Header;
