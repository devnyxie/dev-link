import React from 'react';
import { Form } from 'react-bootstrap';
import { BiLockAlt, BiLockOpenAlt } from 'react-icons/bi';



//1. join_btn ={true} join button option 2. role={member.role} Role3. member={member}. If already a member,DESIGN2.4. 
function Member_tile({
  user,
  member,
  role_input = false,
  role,
  set,
  value,
  findMemberInMembersAndEditRole,
}) {
  let identity = user ? user : member;
  return (
    <div
      className='w-100 d-flex justify-content-between align-items-center border-gray rounded p-1 mb-1'
      style={{ height: 'auto' }}
    >
      <div className='h-100 d-flex align-items-start'>
        {identity.pfp ? (
          <img
            src={identity.pfp}
            className='rounded-circle'
            style={{ aspectRatio: 1 / 1, height: '50px' }}
          />
        ) : (
          <>
            {/* <div
              style={{ aspectRatio: 1 / 1, height: '100%' }}
              className='rounded-circle border-gray d-flex align-items-center justify-content-center light-gray'
            >
              ?
            </div>*/}
          </>
        )}
        <div
          className='h-100 d-flex justify-content-end flex-column ms-2'
          style={{ width: 'max-content' }}
        >
          {identity.username ? (
            <>
              <small>@{identity.username}</small>

              <span>{identity.role ? `Role: ${identity.role}` : ''}</span>
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
                value={identity.role}
                onChange={(e) =>
                  findMemberInMembersAndEditRole({
                    role: e.target.value,
                    id: identity.id,
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
      {identity.id ? (
        <BiLockAlt size={25} className='light-gray me-2' />
      ) : (
        <div className='custom-button border-gray rounded p-1 px-2'>Join</div>
      )}
    </div>
  );
}

export default Member_tile;
