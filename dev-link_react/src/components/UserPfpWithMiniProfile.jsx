import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getOneUser } from '../Redux/Actions/users';
import { AiFillGithub } from 'react-icons/ai';
import UserPfp from './user_pfp/UserPfp';

function UserPfpWithMiniProfile({ member }) {
  const dispatch = useDispatch();
  return (
    <div className="position-relative">
      <div
        // onMouseEnter={handleHover}
        // onMouseLeave={handleMouseLeave}
        style={{
          aspectRatio: 1 / 1,
          width: '60px',
        }}
        className="team-member-pfp me-1 "
      >
        {/* <img
          src={`${member.pfp}`}
          className="w-100 h-100 rounded-circle border-gray bg-main"
        /> */}
        <div className="w-100 h-100 rounded-circle border-gray bg-main overflow-hidden">
          <UserPfp pfp={member.pfp} />
        </div>
      </div>
      {/* <div
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        className='position-absolute border-gray p-1 bg-main '
        // d-none d-md-block
        style={{
          //   display: 'block',
          display: showMiniProfile ? 'block' : 'none',
          height: '200px',
          width: '400px',
          top: '100%',
          zIndex: 3,
          borderRadius: '5px',
        }}
      >
        <div
          className='border-gray rounded p-1 d-flex align-items-end d-flex flex-fill'
          style={{
            height: '50%',
            background:
              "linear-gradient(to right, black, transparent), url('https://i.pinimg.com/originals/0b/5c/c0/0b5cc024841accd9a31a7b2daeb0e57b.gif')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div
            className='border-gray rounded'
            style={{ height: '90%', aspectRatio: 1 / 1 }}
          >
            <img src={user.pfp} className='w-100 h-100' />
          </div>
          <div className='ms-2'>
            <div>@{user.username}</div>
            <div>
              {user.name} {user.surname}
            </div>
          </div>
        </div>
        <div className='d-flex flex-fill'>
          {' '}
          <small>
            I'm a software engineer, and my world revolves around lines of code
            and algorithms. From the moment I wake up...
          </small>
        </div>
      </div> */}
    </div>
  );
}

export default UserPfpWithMiniProfile;
