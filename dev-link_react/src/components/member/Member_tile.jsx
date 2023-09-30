import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { BiLockAlt, BiLockOpenAlt } from 'react-icons/bi';
import UserPfp from '../user_pfp/UserPfp';

//1. join_btn ={true} join button option 2. role={member.role} Role3. member={member}. If already a member,DESIGN2.4.
function Member_tile({
  member,
  config: {
    owner = false,
    role_input = false,
    pfp = false,
    username = false,
    role = false,
    btn = false,
  },
  //
  set,
  value,
  findMemberInMembersAndEditRole,
  deleteMemberById,
  joinOrLeaveFunc,
  loggedUser,
}) {
  const showLeftBlock = pfp || username || role ? true : false;
  function renderBtn() {
    if (btn) {
      if (member.user_id) {
        if (loggedUser) {
          if (member.user_id === loggedUser.id) {
            return (
              <div
                className="custom-button border-gray rounded p-1 px-2"
                onClick={() => joinOrLeaveFunc(member.member_id)}
              >
                Leave
              </div>
            );
          } else {
            return <BiLockAlt size={25} className="light-gray me-2" />;
          }
        } else {
          return (
            <div
              className="custom-button border-gray rounded p-1 px-2"
              onClick={() => joinOrLeaveFunc(member.member_id)}
            >
              Join
            </div>
          );
        }
      } else {
        return (
          <div
            className="custom-button border-gray rounded p-1 px-2"
            onClick={() => joinOrLeaveFunc(member.member_id)}
          >
            Join
          </div>
        );
      }
    } else {
      if (member.username) {
        return <BiLockAlt size={25} className="light-gray me-2 " />;
      } else {
        return (
          <Button
            className="btn-sm btn-danger"
            onClick={() => deleteMemberById(member.id)}
          >
            Delete
          </Button>
        );
      }
    }
  }
  return (
    <div
      className="w-100 d-flex justify-content-between align-items-center border-gray rounded p-1 mb-1"
      style={{ height: 'auto' }}
    >
      {/* --- 1st block: pfp, username, mini-role --- */}
      {/* if pfp || username || role -> show this block */}
      {showLeftBlock ? (
        <div className="h-100 d-flex align-items-center">
          {pfp ? (
            <div
              className="rounded-circle overflow-hidden"
              style={{ aspectRatio: 1 / 1, height: '50px' }}
            >
              <UserPfp pfp={member.pfp} />
            </div>
          ) : (
            <></>
          )}
          <div
            className="h-100 d-flex justify-content-end flex-column ms-2 "
            style={{ maxWidth: '200px' }}
            // style={{ width: "max-content" }}
          >
            {username || role ? (
              <div className="w-100 d-flex flex-column">
                <small>{member.username ? `@${member.username}` : ''}</small>
                <div>
                  {member.role || role ? (
                    <>
                      {member.username ? (
                        <>
                          <p className="m-0 text-truncate">
                            As:{' '}
                            <span className="opacity-75 text-decoration-underline text-truncate">
                              {member.role}
                            </span>
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="m-0 text-truncate">
                            Role:{' '}
                            <span className="opacity-75 text-decoration-underline text-truncate">
                              {member.role}
                            </span>
                          </p>
                        </>
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      {role_input && role === false ? (
        <>
          {owner ? (
            <>
              <Form.Control
                maxLength={40}
                className="border-bottom-input flex-fill"
                type="text"
                placeholder="Type here your role"
                value={value}
                onChange={(e) => set(e.target.value)}
                style={{ width: 'min-content' }}
              />
            </>
          ) : (
            <>
              <Form.Control
                maxLength={40}
                className="border-bottom-input flex-fill"
                type="text"
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
      {renderBtn()}
    </div>
  );
}

export default Member_tile;
