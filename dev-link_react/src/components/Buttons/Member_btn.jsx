import React from 'react';
import { Button } from 'react-bootstrap';
import { BiLockAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import UserPfp from '../user_pfp/UserPfp';
import { useDispatch } from 'react-redux';
import { kickMember } from '../../Redux/Actions/teams';

function Member_btn({ member, loggedUser, joinOrLeaveFunc, team }) {
  const dispatch = useDispatch();
  return (
    <div
      className="w-100 d-flex justify-content-between align-items-center border-gray rounded p-1 mb-1"
      style={{ minHeight: '55px', maxHeight: 'auto' }}
    >
      <div className="h-100 d-flex flex-grow-1 align-items-center">
        <div className="d-flex p-1">
          <div style={{ width: '55px', height: '55px' }}>
            <UserPfp
              pfp={member.pfp}
              img_classes="rounded-circle border-gray me-1"
            />
          </div>
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
            <p className="m-0 small text-break">As: {member.role}</p>
          </div>
        </div>
      </div>
      <div>
        {member.user_id === loggedUser.id ? (
          <div
            className="custom-button border-gray p-1 px-2 me-1 rounded"
            onClick={() => joinOrLeaveFunc(member.member_id)}
            data-tooltip-id="tooltip"
            data-tooltip-content={
              team.creator_id === loggedUser.id
                ? 'If you leave the team, ownership will be passed to another user'
                : 'Leave the team'
            }
            data-tooltip-place="bottom"
          >
            Leave
          </div>
        ) : (
          <div className="">
            {team.creator_id === loggedUser.id ? (
              <div
                className="custom-button border-gray p-1 px-2 me-1 rounded"
                data-tooltip-id="tooltip"
                data-tooltip-content={`Kick ${member.username}`}
                data-tooltip-place="bottom"
                onClick={() =>
                  dispatch(kickMember({ member: member, team: team }))
                }
              >
                Kick
              </div>
            ) : (
              <div className="custom-button rounded p-1 px-2">
                <BiLockAlt size={25} className="light-gray" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Member_btn;
