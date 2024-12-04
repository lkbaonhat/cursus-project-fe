import React from "react";
import styled from "styled-components";

const FileInputContainer = styled.div`
    margin-top: 20px;
    padding: 20px;
    border: 2px dashed #cccccc;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    position: relative;
`;

const InfoContainer = styled.div`
    margin-top: 10px;
    font-size: 0.9rem;
    color: #555;
`;

const CustomButton = styled.button`
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;

    &:hover {
        background-color: #cc0000;
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

interface FileUploaderProps {
    onFileSelect: (file: File | null) => void;
    uploadLimit: number | undefined;
    maxAttachmentSize: number | undefined;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, uploadLimit, maxAttachmentSize }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onFileSelect(event.target.files[0]);
        }
    };

    return (
        <FileInputContainer>
            <CustomButton as="label">
                Choose File
                <HiddenInput type="file" onChange={handleFileChange} />
            </CustomButton>
            <InfoContainer>
                <p>
                    <strong>Upload Limit:</strong> {uploadLimit || 0} files
                </p>
                <p>
                    <strong>Max Attachment Size:</strong> {maxAttachmentSize || 0} MB
                </p>
            </InfoContainer>
        </FileInputContainer>
    );
};

export default FileUploader;
