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
      <Link to={`/team?team_id=${team.id}`} className='ellipsis'>
        <h5 className='ellipsis text-link'> {team.name}</h5>
      </Link>
      <p className='fst-italic truncate-text opacity-50'>
        {team.description_short ? team.description_short : <>No description</>}
      </p>
      <div
        className='position-absolute d-flex justify-content-between w-100 px-2'
        style={{ bottom: '-25px', left: 0 }}
      >
        {/* left part */}
        <div className='d-flex'>
          <UserPfpWithMiniProfile member={team.creator} />
          {team.members.map((member, index) => {
            return <UserPfpWithMiniProfile key={index} member={member} />;
          })}
        </div>
        {/* right part */}
        <div
          className='me-4 d-flex flex-column justify-content-center'
          style={{ height: '60px' }}
        >
          <Button className='custom-button border-gray'>Join</Button>
        </div>
      </div>
    </div>
  );
}

export default Team;
