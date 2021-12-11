import { NavLink } from "react-router-dom";

import styles from "./NavLinks.module.css";

function NavLinks(props) {
  return (
    <ul className={styles.navs}>
      <li>
        <NavLink to="/:uid">MY TASKS</NavLink>
      </li>
      <li>
        <NavLink to="/:uid/newtask">ADD TASK</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
