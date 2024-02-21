import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Team from "../../components/Team";
import { useSelector } from "react-redux";
import { fetchTeamsByUserId } from "../../redux/slices/teams.slice";

function YourTeams() {
  const user = useSelector((state) => state.user.user);
  const [teams, setTeams] = useState([]);
  const dispatch = useDispatch();
  //fetch from fetchTeamsByUserId
  useEffect(() => {
    dispatch(fetchTeamsByUserId(user.id)).then((res) => {
      console.log(res);
      setTeams(res.payload);
    });
  }, []);

  return (
    <>
      {teams.map((team, index) => {
        return <Team key={index} team={team} />;
      })}
    </>
  );
}

export default YourTeams;
