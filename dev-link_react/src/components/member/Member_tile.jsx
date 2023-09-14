import React from 'react';
import { Form } from 'react-bootstrap';
import { BiLockAlt, BiLockOpenAlt } from 'react-icons/bi';

function Member_tile({
  user,
  member,
  role_input = false,
  set,
  value,
  findMemberInMembersAndEditRole,
}) {
  let identity = user ? user : member;
  return (
    <div
      className='w-100 d-flex justify-content-between align-items-center border-gray rounded p-1 mb-1'
      style={{ height: '60px' }}
    >
      <div className='d-flex align-items-end'>
        {identity.pfp ? (
          <img
            src={identity.pfp}
            className='rounded-circle'
            style={{ aspectRatio: 1 / 1, height: '50px' }}
          />
        ) : (
          <div
            style={{ aspectRatio: 1 / 1, height: '50px' }}
            className='rounded-circle border-gray d-flex align-items-center justify-content-center light-gray'
          >
            ?{' '}
          </div>
        )}
        <div
          className='h-100 d-flex justify-content-end flex-column ms-2'
          style={{ width: 'max-content' }}
        >
          {identity.username ? (
            <>
              <small>@{identity.username}</small>
              <span>
                {identity.name} {identity.surname}
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {role_input ? (
        <>
          {user ? (
            <>
              <Form.Control
                className='border-bottom-input'
                type='text'
                placeholder='Type here your role'
                value={value}
                onChange={(e) => set(e.target.value)}
                style={{ width: 'min-content' }}
              />
            </>
          ) : (
            <>
              <Form.Control
                className='border-bottom-input'
                type='text'
                placeholder="Type here member's role"
                value={member.role}
                onChange={(e) =>
                  findMemberInMembersAndEditRole({
                    role: e.target.value,
                    id: member.id,
                  })
                }
                style={{ width: 'min-content' }}
              />
            </>
          )}
        </>
      ) : (
        <></>
      )}
      {user ? (
        <BiLockAlt size={25} className='light-gray me-2' />
      ) : (
        <BiLockOpenAlt size={25} className='light-gray me-2' />
      )}
    </div>
  );
}

export default Member_tile;
