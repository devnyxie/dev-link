import React from "react";
import Alert from "react-bootstrap/Alert";
import { useDispatch } from "react-redux";
import { CHANGE_STATUS } from "../../Redux/Actions/ui";
import "./index.css";
function Alert_widget({ status, other }) {
  console.log("STATUS:", status);
  const dispatch = useDispatch();
  //
  function removeStatus() {
    dispatch({
      type: CHANGE_STATUS,
      payload: null,
    });
  }

  // Call the function after a 2-second delay
  setTimeout(removeStatus, 1300);
  //

  if (status === 409) {
    return (
      <Alert
        className="alert-widget"
        onClose={() =>
          dispatch({
            type: CHANGE_STATUS,
            payload: null,
          })
        }
        variant="warning"
        dismissible
      >
        You are already member of this team
      </Alert>
    );
  }
  if (status === 403) {
    return (
      <Alert
        className="alert-widget"
        onClose={() =>
          dispatch({
            type: CHANGE_STATUS,
            payload: null,
          })
        }
        variant="danger"
        dismissible
      >
        You have to log in to do this
      </Alert>
    );
  }
}

export default Alert_widget;
