import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/atoms/Button/Button';
import TextArea from '@/components/organisms/TextField/TextArea';
import { useTranslation } from 'react-i18next';
import { uploadFile } from '@/utils/firebase/uploadFile';
import { style } from '@/theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectStateUserInfo } from '@/modules/global/selector';
import { decodeJWT } from '@/utils/hooks/useUser';
import { selectedCategories } from '@/modules/course/selector';

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 12px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NameInputContainer = styled.div``;

const ProfileLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const LinkInputContainer = styled.div`
  /* display: flex;
  align-items: center; */
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LinkPrefix = styled.span`
  background-color: #d2d2d2;
  padding: 9px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: bold;
  color: #515151;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

const HorizontalRule = styled.hr`
  color: #9b9b9b;
  margin: 30px 0;
  width: 90%;
`;
// --------------------------------------------------

const UploadButton = styled.button`
  background-color: white;
  border: 1px solid ${style.colors.gray.placeholder_focus};
  color: teal;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  width: 100%;
  &:hover {
    background-color: #f9f9f9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Styled components cho select
const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const StyledOption = styled.option`
  padding: 5px;
  font-size: 14px;
  color: #333;
`;

const Account = () => {
  const { t } = useTranslation('setting');

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: '',
      image: '',
      description: '',
      categoryId: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      youtube: '',
    },
  });
  const fileInputRefImages = useRef<HTMLInputElement | null>(null);
  const platforms = ['facebook', 'twitter', 'linkedin', 'youtube'] as const;
  const handleUploadComplete = async (file: File, folder: string) => {

    try {
      const url = await uploadFile(file, folder);
      if (folder === 'images') {
        setValue('image', url, { shouldValidate: true });
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  const dispatch = useDispatch();
  const user = decodeJWT()
  const userInfo = useSelector(selectStateUserInfo)
  const listCategories = useSelector(selectedCategories);
  const [nub, setnub] = useState(0);

  const onSubmit = (data: any) => {
    dispatch({ type: 'updateUserById', payload: { ...data, userId: user?.sub } });
    setnub((a) => a + 1);
  };

  useEffect(() => {
    dispatch({ type: 'getUserById', payload: user?.sub });
    dispatch({ type: 'getAllCategories' })
  }, [nub]);

  useEffect(() => {
    if (userInfo) {
      setValue('fullname', userInfo?.fullname);
      setValue('image', userInfo?.image);
      setValue('description', userInfo?.description);
      setValue('categoryId', userInfo?.categoryId?._id);
      setValue('facebook', userInfo?.facebook || '');
      setValue('twitter', userInfo?.twitter || '');
      setValue('linkedin', userInfo?.linkedin || '');
      setValue('youtube', userInfo?.youtube || '');
    }
  }, [userInfo, setValue])

  return (
    <Section>
      <SectionTitle>{t('setting.your_cursus_account')}</SectionTitle>
      <p>{t('setting.account_description')}</p>
      <SectionTitle>{t('setting.basic_profile')}</SectionTitle>
      <p>{t('setting.add_information')}</p>

      <NameInputContainer className="row">
        <div className="col-12">
          <Controller
            name="fullname"
            control={control}
            rules={{ required: 'Full name is required' }}
            render={({ field }) => (
              <>
                <StyledInput
                  placeholder={t('setting.first_name')}
                  {...field}
                />
                {errors.fullname && <ErrorMessage>{errors.fullname.message}</ErrorMessage>}
              </>
            )}
          />
        </div>
      </NameInputContainer>

      <div className="row mb-3">
        <div className="col-3 d-flex align-items-center justify-content-center">
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
            {getValues('image') ? 'Change avatar' : 'Upload avatar'}
            {/* {loading ? 'Uploading...' : 'Upload Video Poster'} */}
          </UploadButton>
        </div>

        <div className='col-3 d-flex align-items-center justify-content-center'>
          {getValues('image') ? <a href={getValues('image')} target="_blank" rel="noopener noreferrer">View Image</a> : 'No Image'}
        </div>


        <div className='col-6'>
          <Controller
            name="categoryId"
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <>
                <StyledSelect {...field}>
                  <StyledOption value="" disabled selected hidden>
                    Select a category
                  </StyledOption>

                  <StyledOption value={userInfo?.categoryId?._id} disabled>
                    {userInfo?.categoryId?.name}
                  </StyledOption>

                  {listCategories?.filter((category) => category?._id !== userInfo?.categoryId?._id).map((category) => (
                    <StyledOption value={category?._id} key={category?._id}>
                      {category?.name}
                    </StyledOption>
                  ))}
                </StyledSelect>
                {errors.categoryId && <ErrorMessage>{errors.categoryId.message}</ErrorMessage>}
              </>
            )}
          />
        </div>
      </div>

      <Controller
        name="description"
        control={control}
        rules={{ required: 'Description is required' }}
        render={({ field }) => (
          <>
            <TextArea
              width="100%"
              input={field.value}
              onChange={field.onChange}
            />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          </>
        )}
      />

      <p>{t('setting.links_and_coupon_codes')}</p>
      <HorizontalRule />
      <SectionTitle>{t('setting.profile_links')}</SectionTitle>
      <ProfileLinksContainer>
        {platforms.map((platform) => (
          <LinkInputContainer key={platform}>
            <LinkPrefix>
              {platform === 'facebook'
                ? 'http://facebook.com/'
                : platform === 'twitter'
                  ? 'http://twitter.com/'
                  : platform === 'linkedin'
                    ? 'http://www.linkedin.com/'
                    : 'http://www.youtube.com/'}
            </LinkPrefix>
            <Controller
              name={platform}
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder={t(`setting.${platform}_profile`)}
                    {...field}
                  />
                </>
              )}
            />
          </LinkInputContainer>
        ))}
      </ProfileLinksContainer>
      <Button width="150px" onClick={handleSubmit(onSubmit)}>
        {t('setting.save_changes')}
      </Button>
    </Section>
  );
};

export default Account;
