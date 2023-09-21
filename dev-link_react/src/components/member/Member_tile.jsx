import React from "react";
import { Form } from "react-bootstrap";
import { BiLockAlt, BiLockOpenAlt } from "react-icons/bi";

//1. join_btn ={true} join button option 2. role={member.role} Role3. member={member}. If already a member,DESIGN2.4.
function Member_tile({
  member,
  config: {
    owner = false,
    role_input = false,
    pfp = false,
    username = false,
    role = false,
    join_btn = false,
  },
  //
  set,
  value,
  findMemberInMembersAndEditRole,
  joinOrLeaveFunc,
  loggedUser,
}) {
  const showLeftBlock = pfp || username || role ? true : false;
  return (
    <div
      className="w-100 d-flex justify-content-between align-items-center border-gray rounded p-1 mb-1"
      style={{ height: "auto" }}
    >
      {/* --- 1st block: pfp, username, mini-role --- */}
      {/* if pfp || username || role -> show this block */}
      {showLeftBlock ? (
        <div className="h-100 d-flex align-items-center">
          {pfp ? (
            <img
              src={member.pfp}
              className="rounded-circle"
              style={{ aspectRatio: 1 / 1, height: "50px" }}
            />
          ) : (
            <></>
          )}
          <div
            className="h-100 d-flex justify-content-end flex-column ms-2"
            // style={{ width: "max-content" }}
          >
            {username || role ? (
              <>
                <small>{member.username ? `@${member.username}` : ""}</small>
                <span>
                  {member.role || role ? (
                    <>
                      {member.username ? (
                        <>
                          As:{" "}
                          <span className="opacity-75 text-decoration-underline">
                            {member.role}
                          </span>
                        </>
                      ) : (
                        <>
                          {" "}
                          Role:{" "}
                          <span className="opacity-75 text-decoration-underline">
                            {member.role}
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </>
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
                style={{ width: "min-content" }}
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
                style={{ width: "min-content" }}
              />
            </>
          )}
        </>
      ) : (
        <></>
      )}

      {join_btn ? (
        <div
          className="custom-button border-gray rounded p-1 px-2"
          onClick={() => joinOrLeaveFunc(member.member_id)}
        >
          Join
        </div>
      ) : (
        <>
          {member.username ? (
            member.user_id === loggedUser.id ? (
              <div
                className="custom-button border-gray rounded p-1 px-2"
                onClick={() => joinOrLeaveFunc(member.member_id)}
              >
                Leave
              </div>
            ) : (
              <BiLockAlt size={25} className="light-gray me-2" />
            )
          ) : (
            <BiLockOpenAlt size={25} className="light-gray me-2" />
          )}
        </>
      )}
    </div>
  );
}

export default Member_tile;
