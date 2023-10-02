import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { MdOutlineAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import MD_view from './MD_view';
import UserPfpWithMiniProfile from './UserPfpWithMiniProfile';

function Team({ team, index }) {
  return (
    <div
      className={`team-${index} m-2 mb-5 border-gray p-2 pb-4 rounded position-relative`}
    >
      <Link to={`/team?team_id=${team.id}`} className="ellipsis">
        <h5 className="ellipsis text-link"> {team.name}</h5>
      </Link>
      <p className="fst-italic truncate-text opacity-50">
        {team.description_short ? team.description_short : <>No description</>}
      </p>
      <div
        className="position-absolute d-flex justify-content-between w-100 px-2"
        style={{ bottom: '-25px', left: 0 }}
      >
        {/* left part */}
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
        {/* right part */}
      </div>
      <div
        className="text-end position-absolute p-2 light-gray"
        style={{ right: 0, bottom: 0, cursor: 'pointer', userSelect: 'none' }}
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
    </div>
  );
}

export default Team;
