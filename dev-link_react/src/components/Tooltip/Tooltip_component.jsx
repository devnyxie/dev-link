import React from 'react';
import { Tooltip } from 'react-tooltip';
function Tooltip_component() {
  return (
    <div style={{ zIndex: '99' }}>
      <Tooltip id="tooltip" />
    </div>
  );
}

export default Tooltip_component;
