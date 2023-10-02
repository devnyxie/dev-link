import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import MD_view from '../../components/MD_view';
import { useDispatch } from 'react-redux';
import { getOneTeam, joinOrLeave } from '../../Redux/Actions/teams';
import Member_tile from '../../components/member/Member_tile';
import { CHANGE_STATUS } from '../../Redux/Actions/ui';
function Team_View({ teams, user }) {
  const dispatch = useDispatch();
  const [team, setTeam] = useState({});
  const [searchParams] = useSearchParams();
  // const [alreadyMember, setAlreadyMember] = useState(false)
  useEffect(() => {
    const targetId = searchParams.get('team_id');
    let found_team = teams.find((team) => team.id === targetId);
    if (!found_team) {
      dispatch(getOneTeam({ id: targetId, setTeam: setTeam }));
    } else {
      setTeam(found_team);
    }
  }, []);

  function joinOrLeaveFunc(member_id) {
    const alreadyMember = team.members.find(
      (member) => member.user_id === user.id
    );
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
            <h4 className="mb-4 border-gray-bottom p-2">{team?.name}</h4>
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
          <div className="h-100">
            <div className="sticky-md-top p-3">
              <div className="rounded p-1">
                <small className="light-gray">Members:</small>
                {team.members.map((member, index) => {
                  return (
                    <Member_tile
                      key={index}
                      member={member}
                      config={{
                        pfp: true,
                        username: true,
                        role: true,
                        leave_btn: true,
                        btn: true,
                      }}
                      loggedUser={user}
                      joinOrLeaveFunc={joinOrLeaveFunc}
                    />
                  );
                })}
                {team.open_roles.length > 0 ? (
                  <>
                    <small className="light-gray">Open roles:</small>{' '}
                    {team.open_roles.map((member, index) => {
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
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </Col>
        {/* <div style={{ height: '200vh' }}>
          <div className='sticky-top'>
            {' '}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error
            doloribus assumenda accusantium ea aliquam adipisci, rem
            perspiciatis repellendus ut ab pariatur. Facere mollitia sed dolores
            tempore vitae, excepturi ipsum! Sapiente!
          </div>
        </div> */}
      </Row>
      // <div className='d-flex p-5'></div>
    );
  }
}

export default Team_View;
