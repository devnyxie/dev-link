import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import MD_view from '../../components/MD_view';
import { useDispatch } from 'react-redux';
import { getOneTeam, joinOrLeave } from '../../Redux/Actions/teams';
import Member_tile from '../../components/member/Member_tile';
import { CHANGE_STATUS } from '../../Redux/Actions/ui';
import Member_btn from '../../components/Buttons/Member_btn';
import OpenRole_btn from '../../components/Buttons/OpenRole_btn';
function Team_View({ teams, user }) {
  const dispatch = useDispatch();
  const [team, setTeam] = useState({});
  const [searchParams] = useSearchParams();
  const [alreadyMember, setAlreadyMember] = useState(false);
  useEffect(() => {
    const targetId = searchParams.get('team_id');
    let found_team = teams.find((team) => team.id === targetId);
    if (!found_team) {
      dispatch(getOneTeam({ id: targetId }));
    } else {
      setTeam(found_team);
    }
  }, [team, teams]);

  useEffect(() => {
    if (team.members) {
      const alreadyMember = team.members.find(
        (member) => member.user_id === user.id
      );
      setAlreadyMember(alreadyMember);
    }
  }, [team, teams]);

  function joinOrLeaveFunc(member_id) {
    const method = alreadyMember ? 'leave' : 'join';
    dispatch(
      joinOrLeave({ member_id: member_id, team_id: team.id, method: method })
    );
  }

  if (team.members) {
    return (
      <Row className="w-100 position-relative g-0">
        <Col xs={12} md={8}>
          <div className="p-2">
            <h4 className="mb-4 border-gray-bottom p-2 text-break">
              {team.name}
            </h4>
            {team.description_short ? (
              <div className="border-gray-bottom p-2">
                {team.description_short}
              </div>
            ) : (
              <></>
            )}
            <div className="border-gray-bottom p-2">
              <MD_view md={team.description_md} />
            </div>
          </div>
        </Col>
        <Col xs={12} md={4} style={{ zIndex: 1 }}>
          <div className="rounded p-1">
            <small className="light-gray">Members:</small>

            {team.members.map((member, index) => {
              return (
                <Member_btn
                  key={index}
                  team={team}
                  member={member}
                  loggedUser={user}
                  joinOrLeaveFunc={joinOrLeaveFunc}
                />
              );
            })}
            {team.open_roles.length > 0 ? (
              <>
                <small className="light-gray">Open roles:</small>
                {/* {team.open_roles.map((member, index) => {
                  return (
                    <Member_tile
                      key={index}
                      member={member}
                      config={{
                        role_input: true,
                        role: member.role ? member.role : '?',
                        pfp: false,
                        join_btn: true,
                        btn: true,
                      }}
                      loggedUser={user}
                      joinOrLeaveFunc={joinOrLeaveFunc}
                    />
                  );
                })} */}
                {team.open_roles.map((member, index) => {
                  return (
                    <OpenRole_btn
                      member={member}
                      isMember={alreadyMember}
                      loggedUser={user}
                      joinOrLeaveFunc={joinOrLeaveFunc}
                    />
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
      // <div className='d-flex p-5'></div>
    );
  }
}

export default Team_View;
