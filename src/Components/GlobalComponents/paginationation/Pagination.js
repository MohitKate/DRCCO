import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Pagination.css";
const Pagination = ({ changePageSepa, Arraydata, countOfRecords , forcePage, Pain008AccompanyingNote}) => {
  const [pageNumber, setPageNumber] = useState(0);

  //const userPerPage = countOfRecords? countOfRecords:(Pain008AccompanyingNote)?5:10;
  const userPerPage = (Pain008AccompanyingNote)?5:countOfRecords? countOfRecords:10
  const pageVisited = pageNumber * userPerPage;
  const pageCount = Math.ceil(Arraydata / userPerPage);

  const changePage = (e) => {
    changePageSepa(e.selected,pageVisited,userPerPage);
  };

  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        previousLabel={<FontAwesomeIcon icon={faAngleDoubleLeft} size="xs"/>}
        nextLabel={<FontAwesomeIcon icon={faAngleDoubleRight} size="xs" />}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttns"}
        nextLinkClassName={"nextBttn"}
        disabledLinkClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        marginPagesDisplayed={2}
        forcePage={forcePage}
      />

    </div>
  );
};

export default Pagination;
