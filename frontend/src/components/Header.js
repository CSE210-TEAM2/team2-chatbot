import styles from '../styles/components/Header.module.css';
import logo from '../media/img/logo.png'

function Header() {
  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" />
      <div className={styles.logo}>TritonHealthBot</div>
    </div>
  );
}

export default Header;
