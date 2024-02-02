import React, { useEffect } from "react";
import { FavoriteBorder, FavoriteBorderOutlined } from "@mui/icons-material";
import PositionedMenu from "./PositionedMenu";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchTeam } from "../redux/slices/teams.slice";
import Team from "./Team";

function Feed() {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.teams);
  console.log("change");
  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      {teams && teams.length ? (
        <>
          {teams.map((team) => {
            return <Team key={team.id} team={team} />;
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Feed;
