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

  function getPaginationRange(currentPage, pageCount) {
    if (currentPage < 2) {
      return [...Array(4).keys()];
    } else if (currentPage > pageCount - 3) {
      return [...Array(4).keys()].map((n) => pageCount - 4 + n);
    } else {
      return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    }
  }

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
          {getPaginationRange(currentPage, pageCount).map((page) => (
            <Button
              className="pagination-button"
              key={page}
              onClick={() => goToPage(page)}
              color={currentPage === page ? "primary" : "neutral"}
              variant={currentPage === page ? "soft" : "plain"}
            >
              {page + 1}
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
