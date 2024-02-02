import React, { useEffect } from "react";
import { FavoriteBorder, FavoriteBorderOutlined } from "@mui/icons-material";
import PositionedMenu from "./PositionedMenu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchTeam } from "../redux/slices/teams.slice";
import Team from "./Team";
import { Box } from "@mui/joy";

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
    <Box sx={{ pt: 2, pb: 2 }}>
      {teams && teams.length ? (
        <>
          {teams.map((team) => {
            return <Team key={team.id} team={team} />;
          })}
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default Feed;
