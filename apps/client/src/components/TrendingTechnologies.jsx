import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTrendingTechnologies } from "../redux/slices/technologies.slice";
import { Badge, Box, Chip, IconButton, Typography } from "@mui/joy";
import { SlFire } from "react-icons/sl";
import { FiTrendingUp } from "react-icons/fi";
import TechChip from "./TechChip";

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
          <TechChip
            techName={tech.codeLang.name}
            count={tech.count}
            onClick={(e) => console.log(e)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default TrendingTechnologies;
