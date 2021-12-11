import { Link, NavLink } from "react-router-dom";

import NavLinks from "./NavLinks";

import styles from "./MainHeader.module.css";

function MainHeader() {
  return (
    <header className={styles.header}>
      <Link to="/:uid">
        <div className={styles.title}>
          <h1>Todo App</h1>
        </div>
      </Link>
      <nav>
        <NavLinks />
      </nav>
    </header>
  );
}

export default MainHeader;
