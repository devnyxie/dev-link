import { useEffect, useState } from "react";
import PositionedMenu from "../../components/PositionedMenu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchTeam } from "../../redux/slices/teams.slice";
import Team from "../../components/Team";
import { Alert, Box, Option, Select, Typography } from "@mui/joy";
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
        pt: 2,
        pb: 2,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
