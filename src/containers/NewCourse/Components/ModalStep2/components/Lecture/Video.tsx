import { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
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
  border-radius: 6px;
  margin: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #555;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  width: 100%;
  margin-bottom: 10px;
`;

const AttachmentBox = styled.div`
  border: 2px dashed #ddd;
  padding: 20px;
  max-height: 300px;
  text-align: center;
  margin: 0 auto;
  overflow-y: auto;
  margin-bottom: 20px;
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

const UploadedImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  label {
    margin-right: 10px;
  }
  input {
    padding: 4px 16px;
    border: 1px solid ${style.colors.gray.bg_card_under};
    border-radius: 4px;
    width: 100px;
    outline: none;
    background-color: ${style.colors.gray.bg};
  }
`
interface VideoTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValues: any; // Add getValues to access current form state
}

const VideoTab = ({ control, setValue, getValues }: VideoTabProps) => {
  const [selectedTab, setSelectedTab] = useState('html5');
  const [loading, setLoading] = useState(false);
  const fileInputRefImages = useRef<HTMLInputElement | null>(null);
  const fileInputRefVideos = useRef<HTMLInputElement | null>(null);
  const uploadedImages = getValues('videoPosterUrl') || []; // Get uploaded images from form state
  const uploadedVideos = getValues('videoUrl') || []; // Get uploaded videos from form state

  // Use states to hold hour, minute, and second values
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const duration = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  setValue('duration', duration);

  const handleUploadComplete = async (file: File, folder: string) => {
    setLoading(true);
    try {
      const url = await uploadFile(file, folder);
      if (folder === 'images') {
        setValue('videoPosterUrl', url, [...uploadedImages, url]); // Update form state with new image URL
      } else if (folder === 'videos') {
        setValue('videoUrl', url, [...uploadedVideos, url]); // Store the URL for the uploaded video
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Label>Select your preferred video type. (.mp4, YouTube, Vimeo, etc.)</Label>

      {/* Tab Selector */}
      <TabWrapper>
        {['html5', 'external', 'youtube', 'vimeo', 'embedded'].map((type) => (
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
      {
        selectedTab === 'html5' && (
          <div className="row">
            <div className="col-lg-6 col-md-9 col-sm-12">
              <Label>Upload Video (.mp4)</Label>
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
              </AttachmentBox>

            </div>
            <div className="col-lg-6 col-md-9 col-sm-12">
              <Label>Video Poster</Label>
              <AttachmentBox>
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
                  {loading ? 'Uploading...' : 'Upload Video Poster'}
                </UploadButton>
              </AttachmentBox>

            </div>

            <AttachmentBox>
              <div className='col-12'>
                <h5>Video Poster: </h5>
                {getValues("videoPosterUrl") &&
                  <UploadedImage src={getValues("videoPosterUrl")} alt={`Uploaded image videoPosterUrl`} />
                }
              </div>
              <hr style={{ width: '100%' }} />
              <h5>Video URL: </h5>
              <p>{getValues("videoUrl")}</p>
            </AttachmentBox>

          </div>


        )
      }

      {
        selectedTab === 'external' && (
          <Controller
            name="videoUrl"
            control={control}
            render={({ field }) => (
              <InputField {...field} placeholder="External Video URL" />
            )}
          />
        )
      }

      {
        selectedTab === 'youtube' && (
          <Controller
            name="videoUrl"
            control={control}
            render={({ field }) => (
              <InputField {...field} placeholder="YouTube Video URL" />
            )}
          />
        )
      }

      {
        selectedTab === 'vimeo' && (
          <Controller
            name="videoUrl"
            control={control}
            render={({ field }) => (
              <InputField {...field} placeholder="Vimeo Video URL" />
            )}
          />
        )
      }

      {
        selectedTab === 'embedded' && (
          <Controller
            name="videoUrl"
            control={control}
            render={({ field }) => (
              <InputField {...field} placeholder="Embedded Video URL" />
            )}
          />
        )
      }
      <div>
        <Label>Time Duration: <strong>hh:mm:ss</strong></Label>
        <Duration className='d-flex'>
          <input type="number"
            maxLength={2} value={hours}
            onChange={(e) => setHours(e.target.value)} width={2} />
          <input type="number"
            maxLength={2} value={minutes}
            onChange={(e) => setMinutes(e.target.value)} />
          <input type="number"
            maxLength={2} value={seconds}
            onChange={(e) => setSeconds(e.target.value)} />
        </Duration>

      </div>

    </Container >
  );
};

export default VideoTab;
