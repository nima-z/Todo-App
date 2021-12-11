import { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

function Backdrop(props) {
  return <div className={styles.backdrop}></div>;
}

function Overlay(props) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

const portalDom = document.getElementById("overlays");

function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalDom)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalDom)}
    </Fragment>
  );
}

export default Modal;
