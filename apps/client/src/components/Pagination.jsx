import React from "react";
import { Button, Box, ButtonGroup, Sheet } from "@mui/joy";

export function Pagination({
  itemsPerPage,
  currentPage,
  setCurrentPage,
  count,
}) {
  const pageCount = Math.ceil(count / itemsPerPage);

  const goToPage = (number) => {
    setCurrentPage(number);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber - 1);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        pt: 1,
        pb: 2,
      }}
    >
      <Sheet
        variant="outlined"
        sx={{ borderRadius: "sm", backgroundColor: "transparent" }}
      >
        <ButtonGroup variant="plain" color="neutral">
          <Button onClick={goToPreviousPage} disabled={currentPage === 0}>
            Previous
          </Button>
          {[...Array(pageCount)].map((_, index) => (
            <Button
              className="pagination-button"
              key={index}
              onClick={() => goToPage(index)}
              color={currentPage === index ? "primary" : "neutral"}
              variant={currentPage === index ? "soft" : "plain"}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            onClick={goToNextPage}
            disabled={currentPage === pageCount - 1}
          >
            Next
          </Button>
        </ButtonGroup>
      </Sheet>
    </Box>
  );
}
