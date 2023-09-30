import React from 'react';
import { BiUser } from 'react-icons/bi';

function UserPfp({ pfp, size, img_classes }) {
  return (
    <div
      className={`d-flex justify-content-center align-items-center `}
      style={{
        minHeight: '30px',
        height: size,
        width: size,
        objectFit: 'cover',
        aspectRatio: 1 / 1,
      }}
    >
      {pfp ? (
        <img
          style={{ objectFit: 'cover' }}
          src={pfp}
          className={`w-100 h-100 ${img_classes}`}
        />
      ) : (
        <div
          className={`w-100 h-100 bg-main light-gray d-flex justify-content-center align-items-center ${img_classes}`}
        >
          <BiUser size={size} style={{ maxHeight: '50px' }} />
        </div>
      )}
    </div>
  );
}

export default UserPfp;
