import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { MdAdd, MdModeEditOutline, MdOutlineAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import MD_view from './MD_view';
import UserPfpWithMiniProfile from './UserPfpWithMiniProfile';

function Team({ team, index, user }) {
  return (
    <Row
      className={`team-${index} m-2 mb-5 border-gray p-2 rounded position-relative d-flex justify-content-between g-0`}
    >
      <Col xs={8} sm={9} md={10} className="mb-4">
        <Link to={`/team?team_id=${team.id}`} className="ellipsis">
          <h5 className="ellipsis text-link"> {team.name}</h5>
        </Link>
        <p className="fst-italic truncate-text opacity-50">
          {team.description_short ? (
            team.description_short
          ) : (
            <>No description</>
          )}
        </p>
        <div
          className="position-absolute d-flex justify-content-between w-100 px-2"
          style={{ bottom: '-25px', left: 0 }}
        >
          <div className="d-flex">
            {team.members.map((member, index) => {
              if (member && index < 4) {
                return <UserPfpWithMiniProfile key={index} member={member} />;
              } else if (member && index > 3 && index < 5)
                return (
                  <div className="position-relative rounded-circle border-gray bg-main">
                    <div
                      style={{
                        aspectRatio: 1 / 1,
                        width: '60px',
                      }}
                      className="team-member-pfp me-1 d-flex justify-content-center align-items-center light-gray"
                    >
                      <h5 className="m-0">+{team.members.length - 3}</h5>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </Col>
      <Col
        xs={4}
        sm={3}
        md={2}
        className="text-end light-gray d-flex flex-column justify-content-between align-items-end "
        style={{ cursor: 'pointer' }}
      >
        {team.creator_id === user.id ? (
          <Link to={`/edit?team_id=${team.id}`}>
            <MdModeEditOutline
              size={30}
              className="ico-button hoverable rounded p-1 border-gray text-secondary ms-2"
              data-tooltip-id="tooltip"
              data-tooltip-content="Edit"
              data-tooltip-place="bottom"
            />
          </Link>
        ) : (
          <div></div>
        )}

        <div
          className="p-1"
          style={{ width: 'max-content', zIndex: 1 }}
          data-tooltip-id="tooltip"
          data-tooltip-content={`Current team capacity: ${
            team.members.length
          } out of
            ${team.open_roles.length + team.members.length}`}
          data-tooltip-place="bottom"
        >
          Capacity: {team.members.length}/
          {team.open_roles.length + team.members.length}
        </div>
      </Col>
    </Row>
  );
}

export default Team;
