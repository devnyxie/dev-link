import React, { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useDispatch } from "react-redux";
import { CHANGE_STATUS } from "../../Redux/Actions/ui";
import "./index.css";
function Alert_widget({ alert_widget }) {
  const dispatch = useDispatch();
  //
  const status = alert_widget.status;
  const status_text = alert_widget.text;
  let removeStatusTimeout;
  //
  function removeStatus() {
    dispatch({
      type: CHANGE_STATUS,
      payload: { status: null, text: null },
    });
    clearTimeout(removeStatusTimeout);
  }
  useEffect(() => {
    removeStatusTimeout = setTimeout(removeStatus, 2000);
    return () => {
      clearTimeout(removeStatusTimeout);
    };
  }, [alert_widget.status]);
  //
  let variant;
  if (status >= 200 && status < 300) {
    variant = "success";
  } else if (status === 403 || status === 400) {
    variant = "warning";
  } else {
    variant = "danger";
  }
  //
  let text_to_show;
  if (status_text) {
    text_to_show = status_text;
  } else {
    if (status >= 200 && status < 300) {
      text_to_show = "Request was successful";
    } else if (status === 403 || status === 400) {
      text_to_show =
        "Access to this resource is forbidden or the request was malformed.";
    } else {
      text_to_show = "An error occurred while processing the request.";
    }
  }
  if (status) {
    return (
      <Alert
        className="alert-widget"
        onClose={() =>
          dispatch({
            type: CHANGE_STATUS,
            payload: { status: null, text: null },
          })
        }
        variant="warning"
        dismissible
      >
        {text_to_show}
      </Alert>
    );
  }
}

export default Alert_widget;
