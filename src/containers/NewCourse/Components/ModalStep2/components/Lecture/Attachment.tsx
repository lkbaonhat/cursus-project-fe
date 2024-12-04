import { useState, useRef } from "react";
import { Controller, UseFormSetValue, UseFormGetValues } from "react-hook-form";
import styled from "styled-components";
import { uploadFile } from "@/utils/firebase/uploadFile";

const AttachmentBox = styled.div`
  border: 2px dashed #ddd;
  padding: 20px;
  max-height: 300px;
  text-align: center;
  margin: 0 auto;
  overflow-y: auto;
  margin-top: 20px;
`;

const UploadButton = styled.button`
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

const UploadedImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const UploadedImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

interface UploadedFile {
  id: number;
  name: string;
  url: string;
}

interface AttachmentsTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValues: UseFormGetValues<any>;
}

const AttachmentsTab = ({ control, setValue, getValues }: AttachmentsTabProps) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (files: FileList) => {
    setLoading(true);
    const newFiles: UploadedFile[] = [];

    for (const file of Array.from(files)) {
      try {
        const downloadURL = await uploadFile(file, "images");
        newFiles.push({
          id: Date.now() + newFiles.length,
          name: file.name,
          url: downloadURL,
        });

      } catch (error) {
        console.error("Upload failed:", error);
      }
    }

    // Ensure you're logging current files correctly
    const currentFiles = getValues("uploadedFiles") || [];
    const updatedFiles = [...currentFiles, ...newFiles];

    // Set the value for uploadedFiles correctly
    setValue("uploadedFiles", updatedFiles, { shouldValidate: true, shouldDirty: true });
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleUpload(files);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Controller
      name="uploadedFiles"
      control={control}
      defaultValue={[]}
      render={({ field: { value = [] } }) => (
        <AttachmentBox>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            multiple // Enable multiple file selection
          />
          <UploadButton type="button" onClick={handleDivClick} disabled={loading}>
            {loading ? "Uploading..." : "Upload files"}
          </UploadButton>
          {value.length > 0 && (
            <UploadedImagesContainer>
              {value.map((file: UploadedFile) => (
                <UploadedImage key={file.id} src={file.url} alt={file.name} />
              ))}
            </UploadedImagesContainer>
          )}
        </AttachmentBox>
      )}
    />
  );
};

export default AttachmentsTab;
