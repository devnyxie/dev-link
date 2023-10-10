import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import MD_view from '../../components/MD_view';
import { useDispatch } from 'react-redux';
import { BiLockAlt } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import uuid4 from 'uuid4';
import {
  createTeam,
  deleteTeam,
  getOneTeam,
  isMember,
  joinOrLeave,
  updateTeam,
} from '../../Redux/Actions/teams';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import UserPfp from '../../components/user_pfp/UserPfp';
import Member_btn from '../../components/Buttons/Member_btn';
import OpenRole_btn from '../../components/Buttons/OpenRole_btn';
function NewOrEditTeam_View({ user, teams }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [team, setTeam] = useState({});
  const [md, setMd] = useState('');
  const [creatorRole, setCreatorRole] = useState('');
  const [members, setMembers] = useState([]);
  const [res, setRes] = useState(false);
  const targetId = searchParams.get('team_id');

  function addMember() {
    if (!team.members) {
      setMembers([
        ...members,
        {
          member_id: uuid4(),
          role: '',
        },
      ]);
    } else if (team.members) {
      setTeam({
        ...team,
        open_roles: [
          ...team.open_roles,
          {
            member_id: uuid4(),
            role: '',
          },
        ],
      });
    }
  }
  //
  function deleteMemberById(idToDelete) {
    // Use the filter method to create a new array without the member with the specified id
    if (!team.members) {
      const updatedMembers = members.filter(
        (member) => member.member_id !== idToDelete
      );
      setMembers(updatedMembers);
    } else if (team.members) {
      const updatedMembers = team.open_roles.filter(
        (member) => member.member_id !== idToDelete
      );
      setTeam({ ...team, open_roles: updatedMembers });
    }
  }
  //
  function findMemberInMembersAndEditRole({ role, member_id }) {
    // Function to edit a member by member_id
    if (!team.members) {
      const editMember = (role, member_id) => {
        const updatedMembers = members.map((member) =>
          member.member_id === member_id ? { ...member, role: role } : member
        );
        setMembers(updatedMembers);
      };
      editMember(role, member_id);
    } else if (team.members) {
      const editMember = (role, member_id) => {
        const updatedOpenRoles = team.open_roles.map((member) =>
          member.member_id === member_id ? { ...member, role: role } : member
        );
        setTeam({ ...team, open_roles: updatedOpenRoles });
      };
      editMember(role, member_id);
      //
    }
  }

  function createTeamFunc() {
    const user_id = user.id;
    const creator = {
      member_id: uuid4(),
      role: creatorRole,
      user_id: user_id,
    };
    let priv_members = members;
    console.log(`createTeamFunc. priv_members: ${priv_members}`);
    priv_members.unshift(creator);
    console.log(priv_members);
    dispatch(
      createTeam({
        team: {
          ...team,
          creator_id: user_id,
          description_md: md,
          open: open,
          members: priv_members,
        },
        setRes: setRes,
      })
    );
  }
  useEffect(() => {
    if (res) {
      navigate('/');
    }
  }, [res]);
  useEffect(() => {
    if (location.pathname === '/edit' && targetId) {
      const found_team = teams.find((team) => team.id === targetId);
      if (!found_team) {
        dispatch(getOneTeam({ id: targetId }));
      }
      // let found_team = teams.find((team) => team.id === targetId);
      if (found_team) {
        console.log(found_team);
        setMd(found_team.description_md);
        setTeam(found_team);
      }
    } else {
      setMd('');
      setTeam({});
    }
  }, [location, teams]);
  //
  async function joinOrLeaveFunc(member_id) {
    const alreadyMember = team.members.find(
      (member) => member.user_id === user.id
    );
    const method = alreadyMember ? 'leave' : 'join';
    dispatch(
      joinOrLeave({ member_id: member_id, team_id: team.id, method: method })
    );
  }
  //
  if (
    (location.pathname === '/new' && !team.members) ||
    (location.pathname === '/edit' && team.members)
  )
    return (
      <div
        className="w-100 h-100 d-flex flex-column"
        style={{ height: 'max-content' }}
      >
        <Row className="g-0 flex-grow-1 justify-content-center">
          <Col className="p-2 pb-0 d-flex flex-column" xs={12} md={7}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="title"
                placeholder="Name of the team"
                value={team.name}
                onChange={(e) => setTeam({ ...team, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Short description</Form.Label>
              <Form.Control
                as="textarea"
                value={team.description_short}
                onChange={(e) =>
                  setTeam({ ...team, description_short: e.target.value })
                }
                placeholder="Briefly describe the purpose of this team"
                style={{
                  minHeight: '200px',
                }}
              />
            </Form.Group>
            <Form.Group className="h-100 d-flex flex-column">
              <Form.Label>README.md</Form.Label>
              <MD_view
                editor={true}
                md={md}
                setMd={setMd}
                team_placeholder={true}
              />
            </Form.Group>
          </Col>
          <Col className="p-2 pb-0 d-flex flex-column" xs={12} md={7}>
            <Form.Group className="w-100 d-flex flex-column">
              <Form.Label>Team Size & Roles</Form.Label>
              <div
                className="w-100 border-gray rounded flex-fill p-2"
                style={{
                  minHeight: '400px',
                  maxHeight: '500px',
                  overflowY: 'auto',
                }}
              >
                {location.pathname === '/new' ? (
                  <>
                    <small className="text-secondary">Members</small>
                    {/* //-- */}
                    <div
                      className="w-100 d-flex justify-content-between align-items-center border-gray rounded p-1 mb-1"
                      style={{ minHeight: '55px', maxHeight: 'auto' }}
                    >
                      <div style={{ height: '55px', width: '55px' }}>
                        <UserPfp
                          pfp={user.pfp}
                          img_classes="rounded-circle border-gray"
                        />
                      </div>
                      <Form.Control
                        maxLength={40}
                        className="border-bottom-input flex-fill"
                        type="text"
                        placeholder="Type here your role"
                        value={creatorRole}
                        onChange={(e) => setCreatorRole(e.target.value)}
                        style={{ width: 'min-content' }}
                      />
                      <div className="custom-button border-gray rounded me-1 p-1">
                        <BiLockAlt size={25} className="light-gray" />
                      </div>
                    </div>
                    {/* //-- */}
                    <small className="text-secondary">Open roles</small>
                    <div id="members-list">
                      {members.map((member, index) => {
                        return (
                          <div
                            className="w-100 d-flex justify-content-between align-items-center border-gray rounded p-1 mb-1"
                            style={{ minHeight: '55px', maxHeight: 'auto' }}
                          >
                            <Form.Control
                              maxLength={40}
                              className="border-bottom-input flex-fill"
                              type="text"
                              placeholder="Type here your role"
                              value={member.role}
                              onChange={(e) =>
                                findMemberInMembersAndEditRole({
                                  role: e.target.value,
                                  member_id: member.member_id,
                                })
                              }
                              style={{ width: 'min-content' }}
                            />
                            <div
                              className="custom-button border-gray rounded me-1 p-1 px-2"
                              onClick={() => deleteMemberById(member.member_id)}
                            >
                              Delete
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    {team.members && team.open_roles ? (
                      <>
                        {team.members.map((member, index) => {
                          return (
                            <Member_btn
                              key={index}
                              member={member}
                              loggedUser={user}
                              team={team}
                              joinOrLeaveFunc={joinOrLeaveFunc}
                            />
                          );
                        })}

                        {team.open_roles.map((member, index) => {
                          return (
                            <div
                              className="w-100 d-flex justify-content-between align-items-center border-gray rounded p-1 mb-1"
                              style={{ minHeight: '55px', maxHeight: 'auto' }}
                            >
                              <Form.Control
                                maxLength={40}
                                className="border-bottom-input flex-fill"
                                type="text"
                                placeholder="Type here your role"
                                value={member.role}
                                onChange={(e) =>
                                  findMemberInMembersAndEditRole({
                                    role: e.target.value,
                                    member_id: member.member_id,
                                  })
                                }
                                style={{ width: 'min-content' }}
                              />
                              <div
                                className="custom-button border-gray rounded me-1 p-1 px-2"
                                onClick={() =>
                                  deleteMemberById(member.member_id)
                                }
                              >
                                Delete
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                <div className="w-100 d-flex justify-content-end align-items-center p-2">
                  <div
                    style={{ height: '40px', aspectRatio: 1 / 1 }}
                    className="custom-button border-gray rounded d-flex justify-content-center align-items-center"
                    onClick={addMember}
                  >
                    <AiOutlinePlus size={20} />
                  </div>
                </div>
              </div>
            </Form.Group>
          </Col>
          <Col className="px-2 d-flex flex-column" xs={12} md={7}>
            <div className="w-100 d-flex justify-content-between d-flex align-items-center pt-3 pb-3">
              {location.pathname === '/new' ? (
                <>
                  <div></div>
                  <Button variant="outline-light" onClick={createTeamFunc}>
                    Create
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-danger"
                    onClick={() =>
                      dispatch(deleteTeam({ team: team, setRes: setRes }))
                    }
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline-light"
                    onClick={() =>
                      dispatch(
                        updateTeam({ team: { ...team, description_md: md } })
                      )
                    }
                  >
                    Save
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
}

export default NewOrEditTeam_View;
