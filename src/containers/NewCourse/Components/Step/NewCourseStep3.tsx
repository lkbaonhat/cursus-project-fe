import { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import { FaRegImage } from "react-icons/fa";

import { uploadFile } from '@/utils/firebase/uploadFile'; // Import your upload function
import { style } from '@/theme';

const Container = styled.div``;

const TabWrapper = styled.div`
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  background-color: ${({ active }) => (active ? 'red' : '#f0f0f0')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  border: 2px solid #ddd;
  cursor: pointer;
  border-radius: 4px;
  margin: 10px;
`;

const Label = styled.label`
  display: block;
  margin: 10px;
  color: #555;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  width: 100%;
  margin-bottom: 10px;
`;

const AttachmentBox = styled.div`
  border: 2px dashed ${style.colors.gray.bg_card_under};
  border-radius: 6px;
  padding: 20px;
  max-height: 500px;
  text-align: center;
  margin: 16px auto;
  overflow-y: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  background-color: ${style.colors.white.bg};
  p{
    color: ${style.colors.gray.text};
  }
`;

const UploadButton = styled.button`
  margin-top: 14px;
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
  a{
    border: 1px solid ${style.colors.red.bg};
    border-radius: 10px;
    padding: 10px 16px;
    color: ${style.colors.red.bg};
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 26px;
    cursor: pointer;
    :hover{
      background-color: ${style.colors.red.bg_hover};
      color: white;
    }
  }
`;

const UploadedImage = styled.img`
  width: 600px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
`;

const HeaderTitle = styled.div`
  margin: 10px;
  padding: 16px 0;
  border-Bottom: 1px solid #ddd;
  border-Top: 1px solid #ddd;

  h4{
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #333;
    font-weight: 400;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`

interface NewCourseStep3Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValues: any; // Add getValues to access current form state
}

const NewCourseStep3 = ({ control, setValue, getValues }: NewCourseStep3Props) => {
  const [selectedTab, setSelectedTab] = useState('html5(mp4)');
  const [loading, setLoading] = useState(false);
  const fileInputRefImages = useRef<HTMLInputElement | null>(null);
  const fileInputRefVideos = useRef<HTMLInputElement | null>(null);
  const uploadedImages = getValues('image') || []; // Get uploaded images from form state
  const uploadedVideos = getValues('videoUrl') || []; // Get uploaded videos from form state
  const handleUploadComplete = async (file: File, folder: string) => {
    setLoading(true);
    try {
      const url = await uploadFile(file, folder);
      if (folder === 'images') {
        setValue('image', url, [...uploadedImages, url]); // Update form state with new image URL
      } else if (folder === 'videos') {
        setValue('introVideo', url, [...uploadedVideos, url]); // Store the URL for the uploaded video
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <HeaderTitle >
        <h4> <FaRegImage /> Media</h4>
      </HeaderTitle>
      <Label>Intro Course overview provider type. (.mp4, YouTube, Vimeo etc.)</Label>
      {/* Tab Selector */}
      <TabWrapper >
        {['html5(mp4)', 'external', 'youtube', 'vimeo', 'embedded'].map((type) => (
          <TabButton
            key={type}
            type="button"
            active={selectedTab === type}
            onClick={() => setSelectedTab(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </TabButton>
        ))}
      </TabWrapper>

      {/* Content based on selected tab */}
      {selectedTab === 'html5(mp4)' && (
        <div className="row">
          <div className="col-lg-6 col-md-9 col-sm-12">
            <AttachmentBox>
              <input
                type="file"
                accept=".mp4"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadComplete(file, 'videos');
                }}
                style={{ display: 'none' }} // Hidden input for file selection
                ref={fileInputRefVideos} // Assign the ref for opening the dialog
              />
              <UploadButton type='button' onClick={() => fileInputRefVideos.current?.click()}>
                {loading ? 'Uploading...' : 'Upload Video'}
              </UploadButton>
              <p>File Format: .mp4</p>
            </AttachmentBox>
          </div>

          <div className='col-6'>
            <UploadedImagesContainer>
              {getValues('introVideo') && <a target='_blank' href={getValues('introVideo')}>Preview Video</a>}

            </UploadedImagesContainer>
          </div>
        </div>
      )}

      {selectedTab === 'external' && (
        <Controller
          name="introVideo"
          control={control}
          render={({ field }) => (
            <InputField {...field} placeholder="External Video URL" />
          )}
        />
      )}

      {selectedTab === 'youtube' && (
        <Controller
          name="introVideo"
          control={control}
          render={({ field }) => (
            <InputField {...field} placeholder="YouTube Video URL" />
          )}
        />
      )}

      {selectedTab === 'vimeo' && (
        <Controller
          name="introVideo"
          control={control}
          render={({ field }) => (
            <InputField {...field} placeholder="Vimeo Video URL" />
          )}
        />
      )}

      {selectedTab === 'embedded' && (
        <Controller
          name="introVideo"
          control={control}
          render={({ field }) => (
            <InputField {...field} placeholder="Embedded Video URL" />
          )}
        />
      )}

      <div className='row'>
        <div className="col-lg-6 col-md-9 col-sm-12">
          <Label>Course thumbnail*</Label>
          <AttachmentBox>
            {!getValues('image') && <img src="https://gambolthemes.net/html-items/cursus-new-demo/images/thumbnail-demo.jpg" alt="thumbnail demo" />}
            <UploadedImagesContainer>
              {getValues('image') && <UploadedImage src={getValues('image')} alt={`Uploaded image`} />}
            </UploadedImagesContainer>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUploadComplete(file, 'images');
              }}
              style={{ display: 'none' }} // Hidden input for file selection
              ref={fileInputRefImages} // Assign the ref for opening the dialog
            />
            <UploadButton type='button' onClick={() => fileInputRefImages.current?.click()}>
              {loading ? 'Uploading...' : 'Choose thumbnail'}
            </UploadButton>
            <p>Size: 590x300 pixels. Supports: jpg,jpeg, or png</p>
          </AttachmentBox>
        </div>

        <div className='col-6'>

        </div>
      </div>


    </Container>
  );
};

export default NewCourseStep3;
