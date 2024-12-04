import PaginationComp from "@/components/molecules/Pagination/Pagination";
import { style } from "@/theme";
import React, { useEffect, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import styled from "styled-components";

const TableContainer = styled.div<MODEL.IStyleProps>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  font-size: ${style.fonts.size.medium};
  overflow-x: auto;
  font-family: ${style.fonts.family.tertiary};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: ${style.size.padding.p10};
  background-color: ${style.colors.red.bg_active};
  border-bottom: 1px solid #ddd;
`;

const HeaderContent = styled.div<{ align?: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  justify-content: ${(props) => {
    switch (props.align) {
      case "right":
        return "flex-end";
      case "center":
        return "center";
      default:
        return "flex-start";
    }
  }};
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  &:nth-child() {
    background-color: ${style.colors.white.bg};
  }
`;

const TableCell = styled.td<{
  width?: string;
  height?: string;
  align?: string;
}>`
  padding: ${style.size.padding.p_5} ${style.size.padding.p10};
  border-bottom: 1px solid #ddd;
  background-color: ${style.colors.white.bg};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  text-align: ${(props) => props.align || "left"};
`;

export interface TableColumn<T> {
  title?: string;
  dataIndex?: keyof T;
  key?: keyof T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, record: any, index: number) => React.ReactNode;
  width_col?: string;
  align_col?: string;
  align_head?: string;
  isSorted?: boolean;
}

interface DynamicTableProps<T> extends MODEL.IStyleProps {
  data: T[];
  columns: TableColumn<T>[];
  itemPerPage?: number;
}

const TableDynamic = <T,>({
  data,
  columns,
  width,
  height,
  margin,
  padding,
  itemPerPage,
}: DynamicTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [sorted, setSorted] = useState(data);

  const [itemsPerPage] = useState(itemPerPage || 10);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  const currentData = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  let pagination;
  if (totalPages > 1) {
    pagination = (
      <PaginationComp
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        maxPageNumbersToShow={10}
        totalItems={data.length}
        onPageChange={handlePageChange}
      />
    );
  } else {
    pagination = null;
  }

  const handleSortAscending = (key: keyof T) => {
    const sortedData = [...sorted].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue > bValue) return 1;
      if (aValue < bValue) return -1;
      return 0;
    });

    setSorted(sortedData);
  };

  const handleSortDescending = (key: keyof T) => {
    const sortedData = [...sorted].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
      return 0;
    });

    setSorted(sortedData);
  };

  useEffect(() => {
    setSorted(data);
  }, [data]);

  return (
    <TableContainer
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      className="table-container"
    >
      <Table>
        <thead>
          <tr>
            <TableHeader>No.</TableHeader>
            {columns.map((col) => (
              <TableHeader key={String(col.dataIndex)}>
                <div style={{ display: "flex" }}>
                  <HeaderContent align={col.align_head}>
                    {col.title}
                    {col.isSorted && (
                      <Icon>
                        <FaSortUp
                          size={18}
                          onClick={() =>
                            handleSortAscending(col.dataIndex as keyof T)
                          }
                        />
                        <FaSortDown
                          size={18}
                          onClick={() =>
                            handleSortDescending(col.dataIndex as keyof T)
                          }
                        />
                      </Icon>
                    )}
                  </HeaderContent>
                </div>
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((record, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                {(currentPage - 1) * itemsPerPage + rowIndex + 1}
              </TableCell>
              {columns.map((col) => (
                <TableCell
                  key={String(col.dataIndex)}
                  width={col.width_col}
                  align={col.align_col}
                >
                  {col.render
                    ? col.render(
                        record[col.dataIndex as keyof T],
                        record,
                        rowIndex
                      )
                    : String(record[col.dataIndex as keyof T])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>

      <div>{pagination}</div>
    </TableContainer>
  );
};

export default TableDynamic;
