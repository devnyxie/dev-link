import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { BiLockAlt, BiLockOpenAlt } from 'react-icons/bi';
import UserPfp from '../user_pfp/UserPfp';
import { Link } from 'react-router-dom';

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
                className="custom-button border-gray rounded me-1 p-1 px-2"
                onClick={() => joinOrLeaveFunc(member.member_id)}
              >
                Leave
              </div>
            );
          } else {
            return (
              <div className="custom-button border-gray rounded me-1 p-1">
                <BiLockAlt size={25} className="light-gray" />{' '}
              </div>
            );
          }
        } else {
          return (
            <div
              className="custom-button border-gray rounded me-1 p-1 px-2"
              onClick={() => joinOrLeaveFunc(member.member_id)}
            >
              Join
            </div>
          );
        }
      } else {
        return (
          <div
            className="custom-button border-gray rounded me-1 p-1 px-2"
            onClick={() => joinOrLeaveFunc(member.member_id)}
          >
            Join
          </div>
        );
      }
    } else {
      if (member.username) {
        return (
          <div className="custom-button border-gray rounded me-1 p-1 px-2">
            <BiLockAlt size={25} className="light-gray" />{' '}
          </div>
        );
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
  function renderRole() {
    if (member.role || role) {
      if (member.username) {
        return (
          <>
            As: <span className="opacity-75 text-break">{member.role}</span>
          </>
        );
      } else {
        return (
          <>
            Role: <span className="opacity-75 text-break">{member.role}</span>
          </>
        );
      }
    }
  }
  return (
    <div
      className="w-100 d-flex justify-content-between align-items-center border-gray rounded p-1 mb-1"
      style={{ minHeight: '55px', maxHeight: 'auto' }}
    >
      {/* --- 1st block: pfp, username, mini-role --- */}
      {/* if pfp || username || role -> show this block */}
      {showLeftBlock && pfp ? (
        <UserPfp pfp={member.pfp} size={55} img_classes="rounded-circle" />
      ) : (
        <></>
      )}
      {showLeftBlock ? (
        <div className="h-100 d-flex flex-grow-1 align-items-center">
          <div className="d-flex p-1">
            {username || role ? (
              <div>
                <Link
                  className="text-decoration-underline "
                  to={`/profile${
                    member.username === loggedUser.username
                      ? `/`
                      : `/${member.username}`
                  }`}
                >
                  {member.username ? `${member.username}` : ''}
                </Link>
                <p className="m-0 small">{renderRole()}</p>
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
