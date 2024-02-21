import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTrendingTechnologies } from "../redux/slices/technologies.slice";
import { Badge, Box, Chip, IconButton, Typography } from "@mui/joy";
import { SlFire } from "react-icons/sl";
import { FiTrendingUp } from "react-icons/fi";

function TrendingTechnologies({ heading }) {
  const [trendingTechnologies, setTrendingTechnologies] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // fetch data
    dispatch(getTrendingTechnologies()).then((res) => {
      if (res.payload) {
        setTrendingTechnologies(res.payload);
      }
    });
  }, []);
  if (trendingTechnologies.length === 0) return null;
  return (
    <Box sx={{ width: "100%" }} className="fade-in">
      {/* {heading} */}
      <Box sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
        <Typography color="neutral" level="title-md" sx={{ mr: 1 }}>
          Trending Technologies
        </Typography>
        <FiTrendingUp size={20} />
      </Box>
      <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", gap: 0.75 }}>
        {trendingTechnologies.map((tech, index) => (
          //   <Badge
          //     variant="outlined"
          //     size="sm"
          //     badgeContent={tech.count}
          //     badgeInset="0 12px 0 0"
          //   >
          <Chip
            size="md"
            color="primary"
            variant="outlined"
            key={index}
            sx={{ px: 1, display: "flex" }}
            onClick={() => console.log(tech)}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 1,
              }}
            >
              <div>{tech.codeLang.name}</div>
              <Typography fontSize={12} color="neutral">
                {" "}
                {tech.count}
              </Typography>
            </Box>

            {/* <IconButton
              color="primary"
              //   size="sm"
              sx={{
                borderRadius: "sm",
                userSelect: "none",
                p: 0,
                aspectRatio: 1 / 1,
                width: "10px",
                height: "10px",
              }}
            >
              {tech.count}
            </IconButton> */}
          </Chip>
          //   </Badge>
        ))}
      </Box>
    </Box>
  );
}

export default TrendingTechnologies;
