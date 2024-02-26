import logo from '../media/img/logo.png'
import styles from '../styles/components/Header.module.css';

function Header() {
  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" />
      <div className={styles.text}>TritonHealthBot</div>
    </div>
  );
}

export default Header;
