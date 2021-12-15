import Buttons from "../UI/Buttons";
import plusSign from "../../assets/plus-sign.svg";

import styles from "./MainHeader.module.css";

function MainHeader(props) {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>User's List</h1>
        <p>A goal without a plan is just a wish!</p>
      </div>
      <div className={styles.action}>
        <Buttons to={`/${props.uid}/newtask`}>
          <img src={plusSign} alt="" />
        </Buttons>
      </div>
    </header>
  );
}

export default MainHeader;
