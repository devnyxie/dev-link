import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTeam } from "../redux/slices/teams.slice";

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ teams }) {
  return (
    <>
      {teams &&
        teams.map((item) => (
          <div>
            <h3>Item #{item.id}</h3>
          </div>
        ))}
    </>
  );
}

export function PaginatedItems({ itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeam({ offset: itemOffset, limit: 5 }));
  }, [itemOffset]);
  const { teams, count, loading, error } = useSelector((state) => state.teams);

  try {
  } catch (error) {}

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  // BEGIN: be15d9bcejpp
  //   const [currentItems, setCurrentItems] = useState([]);
  const pageCount = Math.ceil(count / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  // END: be15d9bcejpp

  return (
    <>
      <Items teams={teams} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
