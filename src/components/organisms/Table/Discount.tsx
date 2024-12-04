import styled from "styled-components";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MouseEventHandler } from "react";

interface DiscountsProps {
  idItemdi: string;
  coursedi: string;
  sdatedi: string;
  edatedi: string;
  disdi: string;
  statusdi: string;
  actiondi: string;
}

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

export default function Discounts(props: DiscountsProps) {
  const handleEdit = () => {
    // console.log("Edit clicked for item:", props.idItemdi);
  };
  const handleDelete = () => {
    // console.log("Delete clicked for item:", props.idItemdi);
  };
  return (
    <tbody>
      <tr>
        <td>{props.idItemdi}</td>
        <td>{props.coursedi}</td>
        <td>{props.sdatedi}</td>
        <td>{props.edatedi}</td>
        <td>{props.disdi}%</td>
        <TableStatus>{props.statusdi}</TableStatus>
        <td>
          {renderIcon("edit", handleEdit)}
          {renderIcon("delete", handleDelete)}
        </td>
      </tr>
    </tbody>
  );
}
