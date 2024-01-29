import { Box } from "@mui/material";
import React from "react";

function DemoPosts() {
  const renderPosts = () => {
    const posts = [];

    for (let i = 0; i < 20; i++) {
      posts.push(
        <Box
          sx={{ borderColor: "secondary.main" }}
          key={i}
          style={{ height: "100px" }}
          className="widget p-2 mb-2"
        >
          Post
        </Box>
      );
    }

    return posts;
  };
  return <>{renderPosts()}</>;
}

export default DemoPosts;
