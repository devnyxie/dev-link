import { Chip, Typography, chipClasses } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function transformName(name) {
  const lowercasedName = name.toLowerCase();
  switch (lowercasedName) {
    case "c#":
      return "csharp";
    case "c++":
      return "cpp";
    default:
      return lowercasedName;
  }
}

async function importTechIcon(techName) {
  try {
    return {
      icon: (await import(`../assets/technologies/${techName}.svg`)).default,
    };
  } catch (error) {
    return;
  }
}

function TechChip({ techName, count, onClick }) {
  const [icon, setIcon] = useState(null);
  const techNameLowercased = transformName(techName);
  useEffect(() => {
    importTechIcon(techNameLowercased).then((importedIcon) => {
      if (importedIcon) {
        setIcon(importedIcon.icon);
      }
    });
  }, [techNameLowercased]);

  //
  return (
    <Link to={`/search?tech=${techNameLowercased}`}>
      <Chip
        startDecorator={
          icon ? (
            <img src={icon} style={{ height: "15px", width: "auto" }} />
          ) : null
        }
        color="primary"
        variant="soft"
        sx={{
          gap: 1,

          [`&& .MuiChip-label`]: {
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          },
        }}
        onClick={(e) => (onClick ? onClick(e) : null)}
      >
        {techName}
        {count ? (
          <Typography fontSize={12} color="neutral">
            {count}
          </Typography>
        ) : null}
      </Chip>
    </Link>
  );
}

export default TechChip;
