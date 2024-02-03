import React, { useEffect } from "react";
import PositionedMenu from "./PositionedMenu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchTeam } from "../redux/slices/teams.slice";
import Team from "./Team";
import { Box, Option, Select, Typography } from "@mui/joy";

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
      <Box
        sx={{
          pb: 1,
          px: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <Typography level="title-sm" fontSize="xl" color="neutral">
          Home
        </Typography>
        <Box>
          <Select size="sm" defaultValue="5">
            <Option value="5">5</Option>
            <Option value="10">10</Option>
            <Option value="25">25</Option>
            <Option value="50">50</Option>
          </Select>
        </Box>
      </Box>
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
