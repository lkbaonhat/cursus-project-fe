import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { uploadFile } from '@/utils/firebase/uploadFile';
import { style } from '@/theme';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed ${style.colors.gray.bg_card_under};
  padding: 20px;
  width: 100%;
  border-radius: 8px;
  text-align: center;
  min-height: 200px;
`;

const UploadDiv = styled.div`
  background-color: white;
  border: 1px solid red;
  color: red;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  display: inline-block;
  &:hover {
    background-color: #f9f9f9;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const UploadInfo = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

interface FileUploadProps {
    width?: string;
    mode: 'images' | 'videos';
    label: string;
    uploadInfo: string;
    onUploadComplete: (urls: string[]) => void; // Callback to pass URLs to parent
}

const FileUpload: React.FC<FileUploadProps> = ({ mode, label, uploadInfo, onUploadComplete }) => {
    const [fileURLs, setFileURLs] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setLoading(true);
        const urls: string[] = [];
        for (const file of Array.from(files)) {
            try {
                const downloadURL = await uploadFile(file, mode);
                urls.push(downloadURL);
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }

        setFileURLs((prev) => [...prev, ...urls]);
        onUploadComplete([...fileURLs, ...urls]); // Pass updated URLs to parent
        setLoading(false);
    };

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <UploadContainer>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                multiple // Enable multiple file selection
            />
            <UploadDiv onClick={handleDivClick}>
                {loading ? `Uploading ${label}...` : label}
            </UploadDiv>
            <UploadInfo>{uploadInfo}</UploadInfo>
        </UploadContainer>
    );
};

export default FileUpload;
