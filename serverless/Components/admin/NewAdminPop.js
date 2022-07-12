import { useEffect, useState } from "react";
import popupStyles from "../../styles/newAdminPop.module.css";
import PropTypes from "prop-types";

//pop up adapted from https://www.w3school.info/2021/07/09/how-to-create-a-custom-popup-component-in-react/ accessed by louis thatcher on 12/03/22
const NewAdminPop = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0",
      }}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup}>
        <span className={popupStyles.close} onClick={closeHandler}>
          &times;
        </span>
        <h2>{props.title}</h2>
        <div className={popupStyles.content}>{props.children}</div>
      </div>
    </div>
  );
};

NewAdminPop.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default NewAdminPop;
