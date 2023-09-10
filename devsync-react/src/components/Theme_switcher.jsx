import React from 'react';
import { TbBulbOff } from 'react-icons/tb';
function Theme_switcher() {
  return (
    <div
      className='position-absolute text-light m-4 p-2 border-gray rounded-circle hover-effect'
      style={{ top: 0, right: 0 }}
    >
      <TbBulbOff size={25} className='icon' />
    </div>
  );
}

export default Theme_switcher;
