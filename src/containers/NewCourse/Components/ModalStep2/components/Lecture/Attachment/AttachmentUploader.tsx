import React, { useRef } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import styled from "styled-components";

interface AttachmentUploaderProps {
  onUpload: (files: File[]) => void;
}

const UploadButton = styled.button`
  border: 1px solid red;
  background-color: white;
  color: red;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: auto;
`;

const AttachmentInfo = styled.p`
  margin-top: 10px;
  color: #999;
`;

const AttachmentUploader: React.FC<AttachmentUploaderProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onUpload(files); // Trigger the callback to pass files to the parent
  };

  return (
    <>
      <UploadButton onClick={handleButtonClick}>
        <FaRegPlusSquare /> ATTACHMENT
      </UploadButton>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/png, application/pdf, .zip"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <AttachmentInfo>Supports: jpg, jpeg, png, pdf, or .zip</AttachmentInfo>
    </>
  );
};

export default AttachmentUploader;
