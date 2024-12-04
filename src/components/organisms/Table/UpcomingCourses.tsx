import styled from "styled-components";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MouseEventHandler } from "react";

interface UpcomingCoursesProps {
  idItemuc: string;
  titleuc: string;
  thumuc: string;
  categoryuc: string;
  priceuc: string;
  dateuc: string;
  statusuc: string;
  actionuc: string;
}

const TableClick = styled.td`
  cursor: pointer;
  color: #5ca3d3;
  &:hover {
    color: black;
  }
`;

const TableStatus = styled.td`
  color: #d72127;
`;

const TableIconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;

  &:nth-child(2) {
    margin-right: 0;
  }
`;
const renderIcon = (
  iconType: string,
  onClickHandler: MouseEventHandler<HTMLSpanElement> | undefined
) => {
  switch (iconType) {
    case "edit":
      return (
        <TableIconContainer onClick={onClickHandler}>
          <AiOutlineEdit />
        </TableIconContainer>
      );
    case "delete":
      return (
        <TableIconContainer onClick={onClickHandler}>
          <AiOutlineDelete />
        </TableIconContainer>
      );
    default:
      return null;
  }
};

export default function UpcomingCourses(props: UpcomingCoursesProps) {
  const handleEdit = () => {
    console.log("Edit clicked for item:", props.idItemuc);
  };
  const handleDelete = () => {
    console.log("Delete clicked for item:", props.idItemuc);
  };
  const handleCategoryClick = () => {
    console.log("Category clicked:", props.categoryuc);
  };
  const handleThumClick = () => {
    console.log("Vendor clicked: ", props.thumuc);
  }
  return (
    <tbody>
      <tr>
        <td>{props.idItemuc}</td>
        <td>{props.titleuc}</td>
        <TableClick onClick={handleThumClick}>{props.thumuc}</TableClick> 
        <TableClick onClick={handleCategoryClick}>{props.categoryuc}</TableClick> 
        <td>${props.priceuc}</td>
        <td>{props.dateuc}</td>
        <TableStatus>{props.statusuc}</TableStatus>
        <td>
          {renderIcon("edit", handleEdit)}
          {renderIcon("delete", handleDelete)}
        </td>
      </tr>
    </tbody>
  );
}
