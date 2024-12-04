import styled from "styled-components";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; 
import { MouseEventHandler } from "react";

interface MyCoursesProps {
    idItemmc: string,
    titlemc: string;
    datemc: string;
    salemc: string;
    partsmc: string;
    categorymc: string;
    statusmc: string;
    actionmc: string;
  }

const TableCategory = styled.td`
  cursor: pointer; 
  color: #5ca3d3; 
  &:hover {
    color: black
  }
`;

const TableStatus = styled.td`
  color: #D72127; 
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

const renderIcon = (iconType: string, onClickHandler: MouseEventHandler<HTMLSpanElement> | undefined) => {
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

export default function MyCourses (props:MyCoursesProps){
    const handleEdit = () => {
      // console.log("Edit clicked for item:", props.idItemmc);
    };
    const handleDelete = () => {
      // console.log("Delete clicked for item:", props.idItemmc);
    };
    const handleCategoryClick = () => {
      // console.log("Category clicked:", props.categorymc);
    };

    return (
        <tbody>
        <tr>
          <td>{props.idItemmc}</td>
          <td>{props.titlemc}</td>
          <td>{props.datemc}</td>
          <td>{props.salemc}</td>
          <td>{props.partsmc}</td>
          <TableCategory onClick={handleCategoryClick}>{props.categorymc}</TableCategory> 
          <TableStatus>{props.statusmc}</TableStatus>
          <td>
            {renderIcon("edit", handleEdit)} 
            {renderIcon("delete", handleDelete)}
          </td>
        </tr>
      </tbody>
    );
  };