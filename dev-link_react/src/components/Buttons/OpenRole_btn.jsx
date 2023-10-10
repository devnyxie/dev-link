import React from 'react';
import { BiLockAlt } from 'react-icons/bi';

function OpenRole_btn({
  member,
  loggedUser,
  joinOrLeaveFunc,
  isMember,
  deletable,
}) {
  return (
    <div
      className="w-100 d-flex justify-content-between align-items-center border-gray rounded p-1 mb-1"
      style={{ minHeight: '55px', maxHeight: 'auto' }}
    >
      <div className="h-100 d-flex flex-grow-1 align-items-center">
        <div className="d-flex p-1">
          <p className="m-0 small text-break">Role: {member.role}</p>
        </div>
      </div>
      <div>
        {isMember ? (
          <div className="custom-button border-gray rounded me-1 p-1">
            <BiLockAlt size={25} className="light-gray" />
          </div>
        ) : (
          <div
            className="custom-button border-gray p-1 px-2 me-1 rounded"
            onClick={() => joinOrLeaveFunc(member.member_id)}
          >
            Join
          </div>
        )}
      </div>
    </div>
  );
}

export default OpenRole_btn;
