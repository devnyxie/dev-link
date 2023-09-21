import React from "react";
import { Spinner } from "react-bootstrap";

function Loader_component() {
  return (
    <div className="centered-axis-xy" style={{ zIndex: 10 }}>
      <Spinner animation="border" />
    </div>
  );
}

export default Loader_component;
