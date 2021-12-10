import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>Todo App</h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>About</li>
          <li>Login</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
