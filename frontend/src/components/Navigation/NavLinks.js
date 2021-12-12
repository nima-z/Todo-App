import { NavLink, useParams } from "react-router-dom";

import styles from "./NavLinks.module.css";

function NavLinks(props) {
  if (props.uid) {
    return (
      <ul className={styles.navs}>
        <li>
          <NavLink to={`/${props.uid}`}>MY TASKS</NavLink>
        </li>
        <li>
          <NavLink to={`/${props.uid}/newtask`}>ADD TASK</NavLink>
        </li>
      </ul>
    );
  }
  return (
    <ul className={styles.navs}>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
