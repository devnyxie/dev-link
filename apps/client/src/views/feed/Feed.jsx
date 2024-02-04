import React, { useEffect } from "react";
import PositionedMenu from "../../components/PositionedMenu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchTeam } from "../../redux/slices/teams.slice";
import Team from "../../components/Team";
import { Alert, Box, Option, Select, Typography } from "@mui/joy";

function Feed() {
  const dispatch = useDispatch();
  const { teams, loading, error, count } = useSelector((state) => state.teams);
  useEffect(() => {
    dispatch(fetchTeam({ offset: 0, limit: 5 }));
  }, [dispatch]);

  if (error) {
    return <Box sx={{ p: 3 }}>An error occured.</Box>;
  }
  return (
    <Box sx={{ pt: 2, pb: 2, width: "100%" }}>
      <Box
        sx={{
          px: 1,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <Typography level="title-sm" fontSize="xl" color="neutral">
          Recent Teams
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
      {loading ? (
        <>
          {" "}
          {Array(3)
            .fill()
            .map((_, i) => (
              <Team loading={true} />
            ))}
        </>
      ) : (
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
      )}
    </Box>
  );
}

export default Feed;
