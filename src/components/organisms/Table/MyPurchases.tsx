import styled from "styled-components";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineDownload,
} from "react-icons/ai";
import { MouseEventHandler } from "react";

interface MyPurchasesProps {
  idItemmp: string;
  titlemp: string;
  vendormp: string;
  categorymp: string;
  detypemp: string;
  pricemp: string;
  pudatemp: string;
  actionmp: string;
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
    case "download":
      return (
        <TableIconContainer onClick={onClickHandler}>
          <AiOutlineDownload />
        </TableIconContainer>
      );
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

export default function MyPurchases(props: MyPurchasesProps) {
  const handleDownload = () => {
    // console.log("Download ckicked for item: ", props.idItemmp);
  };
  const handleEdit = () => {
    // console.log("Edit clicked for item:", props.idItemmp);
  };
  const handleDelete = () => {
    // console.log("Delete clicked for item:", props.idItemmp);
  };
  const handleCategoryClick = () => {
    // console.log("Category clicked:", props.categorymp);
  };
  const handleVendorClick = () => {
    // console.log("Vendor clicked: ", props.vendormp);
  };
  return (
    <tbody>
      <tr>
        <td>{props.idItemmp}</td>
        <td>{props.titlemp}</td>
        <TableClick onClick={handleVendorClick}>{props.vendormp}</TableClick>
        <TableClick onClick={handleCategoryClick}>
          {props.categorymp}
        </TableClick>
        <TableStatus>{props.detypemp}</TableStatus>
        <td>${props.pricemp}</td>
        <td>{props.pudatemp}</td>
        <td>
          {renderIcon("download", handleDownload)}
          {renderIcon("edit", handleEdit)}
          {renderIcon("delete", handleDelete)}
        </td>
      </tr>
    </tbody>
  );
}
