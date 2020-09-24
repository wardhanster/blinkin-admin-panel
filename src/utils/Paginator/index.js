import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginator = (props) => {
  const { maxClickableCells, paginatorData, pageNumberSelect } = props;
  const [currentPage, setCurrentPage] = React.useState(
    paginatorData.current_page || 1
  );
  const onPageNumberSelect = (pageNum) => {
    pageNumberSelect(pageNum);
    setCurrentPage(pageNum);
  };
  const generatePaginationItem = () => {
    let ClickableCells = [];
    let maXItterations =
      paginatorData.last_page > maxClickableCells
        ? maxClickableCells
        : paginatorData.last_page;
    for (let i = 1; i <= maXItterations; i++) {
      let comp = (
        <PaginationItem
          active={i === currentPage}
          key={`${paginatorData.current_page}-${paginatorData.i}`}
        >
          <PaginationLink onClick={() => onPageNumberSelect(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
      ClickableCells.push([comp]);
    }
    if (maXItterations < paginatorData.last_page) {
      let previousComp = (
        <PaginationItem
          disabled={currentPage === 1}
          key={`PREVIOUS_${paginatorData.current_page}-${paginatorData.last_page}`}
        >
          <PaginationLink
            onClick={() => onPageNumberSelect(paginatorData.current_page - 1)}
          >
            <i className="icon-arrow-left"></i>
          </PaginationLink>
        </PaginationItem>
      );
      let lastPageComp = (
        <React.Fragment key={`NEXT__`}>
          <previousComp />
          <PaginationItem
            disabled={currentPage === paginatorData.last_page}
            key={`NEXT_${paginatorData.current_page}-${paginatorData.last_page}`}
          >
            <PaginationLink
              onClick={() => onPageNumberSelect(paginatorData.current_page + 1)}
            >
              <i className="icon-arrow-right"></i>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem
            active={currentPage === paginatorData.last_page}
            key={`LAST_${paginatorData.current_page}-${paginatorData.last_page}`}
          >
            <PaginationLink
              onClick={() => onPageNumberSelect(paginatorData.last_page)}
            >
              {window.strings.Dashboard_last || "Last"}
            </PaginationLink>
          </PaginationItem>
        </React.Fragment>
      );
      ClickableCells = [previousComp, ...ClickableCells, lastPageComp];
    }
    return ClickableCells;
  };
  return <Pagination size="sm">{generatePaginationItem()}</Pagination>;
};
export default Paginator;
