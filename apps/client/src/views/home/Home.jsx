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
  Grid,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import { Pagination } from "../../components/Pagination";
import TrendingTechnologies from "../../components/TrendingTechnologies";
import { PiSparkle } from "react-icons/pi";

function Feed({
  currentPage,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
  teams,
  loading,
  error,
  count,
}) {
  const dispatch = useDispatch();

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
      <Box sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
        <Typography color="neutral" level="title-md" sx={{ mr: 1 }}>
          Recent Teams
        </Typography>
        <PiSparkle size={20} />
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
        <Box sx={{ width: "100%" }} className="fade-in">
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
        </Box>
      )}

      {/* <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        count={count}
      /> */}
    </Box>
  );
}

function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { teams, loading, error, count } = useSelector((state) => state.teams);

  return (
    <>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid
          xs={12}
          md={5}
          lg={4}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <TrendingTechnologies />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Feed
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            teams={teams}
            loading={loading}
            error={error}
            count={count}
          />
        </Grid>

        <Grid
          xs={12}
          md={5}
          lg={4}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <TrendingTechnologies />
        </Grid>
      </Grid>
      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        count={count}
      />
    </>
  );
}

export default Home;
