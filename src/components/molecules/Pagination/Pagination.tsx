import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  maxPageNumbersToShow: number;
  onPageChange: (page: number) => void;
}

const Pagination = styled.ul`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  list-style: none;
`;

const PaginationItem = styled.li<{ active?: boolean; disabled?: boolean }>`
  margin: 0 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

const PaginationLink = styled.button<{ active?: boolean; disabled?: boolean }>`
  background-color: ${(props) => (props.active ? '#ed2a26' : 'transparent')};
  color: ${(props) => (props.active ? '#fff' : '#ed2a26')};
  border: 1px solid #dee2e6;
  padding: 10px 12px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${(props) => (props.disabled ? 'transparent' : '#e9ecef')};
    color: ${(props) => (props.disabled ? '#ccc' : '#ed2a26')};
  }
`;

const PaginationComp: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  maxPageNumbersToShow,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxPageNumbersToShow / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (start === 1) {
      end = Math.min(totalPages, maxPageNumbersToShow);
    }
    if (end === totalPages) {
      start = Math.max(1, totalPages - maxPageNumbersToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          «
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ‹
        </PaginationLink>
      </PaginationItem>

      {currentPage >= 4 && (
        <>
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        </>
      )}

      {getPageNumbers().map((page) => (
        <PaginationItem key={page} active={page === currentPage}>
          <PaginationLink
            onClick={() => handlePageChange(page)}
            active={page === currentPage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}

      {currentPage < totalPages - 2 && (
        <>
          <PaginationItem disabled>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
          </PaginationItem>
        </>
      )}

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          »
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComp;
