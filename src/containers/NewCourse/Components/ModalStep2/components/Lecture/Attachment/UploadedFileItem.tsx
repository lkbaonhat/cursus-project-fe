import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import styled from "styled-components";

interface UploadedFileItemProps {
  id: number;
  name: string;
  url?: string;
  onDelete: (id: number) => void;
}

const UploadedItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;

  & > div {
    cursor: pointer;
  }
`;

const UploadedFileItem: React.FC<UploadedFileItemProps> = ({ id, name, url, onDelete }) => {
  return (
    <UploadedItem>
      {url ? (
        <img src={url} alt={name} width="100" height="100" style={{ objectFit: "contain" }} />
      ) : (
        <div>{name}</div>
      )}
      <div>
        <IoCloseSharp size={20} onClick={() => onDelete(id)} />
      </div>
    </UploadedItem>
  );
};

export default UploadedFileItem;
