import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-bootstrap/Pagination";

interface ITablePaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const TablePagination: React.FC<ITablePaginationProps> = (
  props: ITablePaginationProps
) => {
  const { totalPages, currentPage, setCurrentPage } = props;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {totalPages > 0 && (
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => {
              if (currentPage === 1) return;
              setCurrentPage(currentPage - 1);
            }}
          />
          {[...Array(Math.floor(totalPages))].map((_, i) => {
            return (
              <Pagination.Item
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                active={currentPage === i + 1}
              >
                {i + 1}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => {
              if (currentPage === totalPages) return;
              setCurrentPage(currentPage + 1);
            }}
          />
        </Pagination>
      )}
    </div>
  );
};

TablePagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default TablePagination;
