import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import MD_view from '../../components/MD_view';
import { useDispatch } from 'react-redux';
import { getOneTeam } from '../../Redux/Actions/teams';
function Team_View({ teams }) {
  const dispatch = useDispatch();
  const [markdownInput, setMarkdownInput] = useState(``);
  const [team, setTeam] = useState({});
  const [searchParams] = useSearchParams();
  // const ds = { value: team.description_md };

  useEffect(() => {
    const targetId = searchParams.get('team_id');
    let found_team = teams.find((team) => team.id === targetId);
    if (!found_team) {
      dispatch(getOneTeam({ id: targetId, setTeam: setTeam }));
      //fetch that specific team
    } else {
      console.log(found_team);
      console.log(typeof team.description_md);
      setTeam(found_team);
    }
  }, []);
  console.log(team?.description_md?.replace(/  /g, '\n'));

  if (team.description_md) {
    return (
      <div className='p-5 '>
        <h4 className='mb-4 border-gray-bottom p-2'>{team?.name}</h4>
        {team.description_short ? (
          <div className='border-gray-bottom p-2'>{team.description_short}</div>
        ) : (
          <></>
        )}
        <div className='border-gray-bottom p-2'>
          <MD_view md={team.description_md} />
        </div>
      </div>
    );
  }
}

export default Team_View;
