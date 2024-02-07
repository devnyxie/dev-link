import { Chip } from "@mui/joy";
import React from "react";
import { DiRubyRough } from "react-icons/di";
import { SiTypescript } from "react-icons/si";
import { FaPhp } from "react-icons/fa";

const createIcon = (IconComponent) => <IconComponent size={20} />;

const technologyIcons = {
  ruby: createIcon(DiRubyRough),
  typescript: createIcon(SiTypescript),
  php: <FaPhp size={30} />,
  // Add more technology-icon pairs as needed
};

export function TechnologyIcon({ technology }) {
  console.log("TechnologyIcon");
  if (technology === undefined) return <div></div>;
  const Icon = technologyIcons[technology.toLowerCase()];
  if (!Icon) return <div></div>;
  return (
    <div style={{ display: "flex", alignItems: "center", zIndex: 99 }}>
      {Icon}
    </div>
  );
}

export default TechnologyIcon;
