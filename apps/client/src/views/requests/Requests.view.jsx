import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteRequest,
  fetchRequestsByUserId,
} from "../../redux/slices/teams.slice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/joy";
import { timeFormatter } from "../../utils/utils";
import { GoTrash } from "react-icons/go";

const AppliedRequest = ({ request, deleteRequestFunc }) => {
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%" }}>
          <div>
            <Typography
              level="title-lg"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
              }}
            >
              {request.team.name}
            </Typography>
            <Typography>
              Role:{" "}
              {request.member.role ? request.member.role : "No role specified"}
            </Typography>
            <Typography level="body-sm">
              Applied on: {timeFormatter(request.createdAt)}
            </Typography>
          </div>

          <CardContent
            orientation="vertical"
            sx={{ justifyContent: "space-between" }}
          >
            <div>
              {" "}
              {request.team.description ? (
                <>
                  <Typography level="body-xs">Description:</Typography>
                  <Typography fontSize="md" fontWeight="md">
                    {request.team.description}
                  </Typography>
                </>
              ) : null}
            </div>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <IconButton
                onClick={() => deleteRequestFunc(request.id)}
                variant="plain"
                color="danger"
                size="sm"
              >
                <GoTrash size={20} />
              </IconButton>
              <Link
                to={`/team/${request.team.id}`}
                style={{
                  textDecoration: "none",

                  display: "flex",
                }}
              >
                <Button variant="plain" color="primary" sx={{ width: "100%" }}>
                  Open
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

function Requests() {
  const user = useSelector((state) => state.user.user);
  const [requests, setRequests] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRequestsByUserId(user.id)).then((res) => {
      console.log(res);
      setRequests(res.payload);
    });
  }, []);

  function deleteRequestFunc(requestId) {
    console.log("Deleting request", requestId);
    dispatch(deleteRequest(requestId)).then((res) => {
      if (res.payload) {
        setRequests(requests.filter((request) => request.id !== requestId));
      }
    });
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
      }}
    >
      {requests.length === 0 ? (
        <>No requests</>
      ) : (
        <Grid container spacing={1} sx={{ width: "100%" }}>
          {requests.map((request) => {
            return (
              <AppliedRequest
                key={request.id}
                request={request}
                deleteRequestFunc={deleteRequestFunc}
              />
            );
          })}
        </Grid>
      )}
    </div>
  );
}

export default Requests;
