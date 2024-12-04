import React from "react";
import styled from "styled-components";
import UploadedFileItem from "./UploadedFileItem";

interface UploadedFile {
  id: number;
  name: string;
  url?: string;
}

interface UploadedFileListProps {
  files: UploadedFile[];
  onDelete: (id: number) => void;
}

const UploadedList = styled.div`
  margin-top: 20px;
  max-height: 200px;
  overflow-y: auto;
`;

const UploadedFileList: React.FC<UploadedFileListProps> = ({ files, onDelete }) => {
  return (
    <UploadedList>
      {files.map((file) => (
        <UploadedFileItem key={file.id} id={file.id} name={file.name} url={file.url} onDelete={onDelete} />
      ))}
    </UploadedList>
  );
};

export default UploadedFileList;
