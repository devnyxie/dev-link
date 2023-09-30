import React from 'react';
import { BiUser } from 'react-icons/bi';

function UserPfp({ pfp }) {
  if (pfp) {
    return (
      <div className="w-100 h-100">
        <img className="w-100 h-100" src={pfp} />
      </div>
    );
  } else {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <BiUser size={25} className="light-gray" />
      </div>
    );
  }
}

export default UserPfp;
