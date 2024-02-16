import { useEffect, useState } from "react";
import PositionedMenu from "../../components/PositionedMenu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchTeam } from "../../redux/slices/teams.slice";
import Team from "../../components/Team";
import {
  Alert,
  Box,
  Divider,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import { Pagination } from "../../components/Pagination";

function Feed() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { teams, loading, error, count } = useSelector((state) => state.teams);
  useEffect(() => {
    dispatch(
      fetchTeam({
        offset: currentPage * itemsPerPage,
        limit: itemsPerPage,
      })
    );
  }, [currentPage, itemsPerPage]);

  if (error) {
    return <Box sx={{ p: 3 }}>An error occured.</Box>;
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: 1,
          pb: 1,
        }}
      >
        <Stack
          spacing={1}
          sx={{
            fontSize: "sm",
            mb: 1,
            mt: 1,
            width: "100%",
          }}
        >
          <Divider sx={{ "--Divider-childPosition": `50%` }}>
            <Typography color="neutral">Recent Teams</Typography>
          </Divider>
        </Stack>
      </Box>
      {loading ? (
        <>
          {" "}
          {Array(3)
            .fill()
            .map((_, i) => (
              <div key={i}>
                <Team index={i} loading={true} />
              </div>
            ))}
        </>
      ) : (
        <>
          {teams && teams.length ? (
            <>
              {teams.map((team, index) => {
                return (
                  <div key={index}>
                    <Team key={index} team={team} />
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </>
      )}

      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        count={count}
      />
    </Box>
  );
}

export default Feed;
