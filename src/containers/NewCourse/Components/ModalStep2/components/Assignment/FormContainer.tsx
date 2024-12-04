import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';
import { uploadFile } from '@/utils/firebase/uploadFile';

const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border: none;
  border-radius: 8px;
  background-color: #fff;
  margin-top: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  input{
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    width: 100%;
  }
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  margin-top: 5px;
`;

const Description = styled.p`
  font-size: 12px;
  color: gray;
`;

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

interface FormContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValues: any;
}

const FormContainer = ({ control, setValue, getValues }: FormContainerProps) => {
  const [durationUnit, setDurationUnit] = useState('Hours');
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

    const currentFiles = getValues("uploadedFiles") || [];
    const updatedFiles = [...currentFiles, ...newFiles];

    setValue("uploadedFiles", updatedFiles, { shouldValidate: true, shouldDirty: true });
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) handleUpload(files);
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <FormWrapper>
        <div className='row'>
          {/* Time Duration */}
          <div className='col-2'>
            <Controller
              name="timeDuration"
              control={control}
              render={({ field }) => (
                <InputWrapper>
                  <Label>Time Duration*</Label>
                  <input {...field} type="number" placeholder="0" />

                  <Description>Assignment time duration</Description>
                </InputWrapper>
              )}
            />
          </div>

          <div className='col-2 mt-4'>
            <select value={durationUnit} onChange={(e) => setDurationUnit(e.target.value)}
              className='p-2' style={{ border: '1px solid #ddd', borderRadius: '4px', outline: 'none' }}>
              <option>Hours</option>
              <option>Days</option>
              <option>Weeks</option>
            </select>
          </div>

          {/* Total Number */}
          <div className='col-4'>
            <Controller
              name="totalNumber"
              control={control}
              render={({ field }) => (
                <InputWrapper>
                  <Label>Total Number*</Label>
                  <input {...field} type="number" placeholder="10" />
                  <Description>Maximum points a student can score</Description>
                </InputWrapper>
              )}
            />
          </div>

          {/* Minimum Pass Number */}
          <div className='col-4'>
            <Controller
              name="minPassNumber"
              control={control}
              render={({ field }) => (
                <InputWrapper>
                  <Label>Minimum Pass Number*</Label>
                  <input {...field} type="number" placeholder="5" />
                  <Description>Minimum points required for the student to pass this assignment</Description>
                </InputWrapper>
              )}
            />
          </div>
        </div>

        <hr style={{ width: '100%' }} />

        <div className='row' style={{ width: '100%' }}>
          <div className='col-6'>
            {/* Upload Attachment Limit */}
            <Controller
              name="uploadLimit"
              control={control}
              render={({ field }) => (
                <InputWrapper>
                  <Label>Upload Attachment Limit*</Label>
                  <input {...field} type="number" placeholder="1" />
                  <Description>Maximum attachment size limit</Description>
                </InputWrapper>
              )}
            />
          </div>

          <div className='col-6'>
            {/* Maximum Attachment Size Limit */}
            <Controller
              name="maxAttachmentSize"
              control={control}
              render={({ field }) => (
                <InputWrapper>
                  <Label>Maximum Attachment Size Limit*</Label>
                  <input {...field} type="number" placeholder="10" />
                  <Description>Define maximum attachment size in MB</Description>
                </InputWrapper>
              )}
            />
          </div>
        </div>

      </FormWrapper>

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
              multiple
            />
            <UploadButton type="button" onClick={handleDivClick} disabled={loading}>
              {loading ? "Uploading..." : "UPLOAD IMAGE"}
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
    </>
  );
};

export default FormContainer;
