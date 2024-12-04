import { useState } from 'react';
import Input from '@/components/organisms/TextField/Input';
import TextArea from '@/components/organisms/TextField/TextArea';
import '@/containers/Feedback/feedback.scss';
import { CgComment } from "react-icons/cg";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/containers/Feedback/components/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { useTranslation } from 'react-i18next'; 

type Data = {
    email: string;
    description: string;
};

const Feedback = () => {
    const { t } = useTranslation('feedback');
    const { register, handleSubmit } = useForm<Data>();
    const [files, setFiles] = useState<{ name: string; preview: string }[]>([]);

    const onSubmit: SubmitHandler<Data> = (value) => {
        console.log(value);
    };

    const getUploadParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' };
    };

    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === 'done') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFiles((prev) => [
                    ...prev,
                    { name: meta.name, preview: reader.result as string },
                ]);
            };
            reader.readAsDataURL(file);
        } else if (status === 'removed') {
            setFiles((prev) => prev.filter((f) => f.name !== meta.name));
        }
    };

    return (
        <div className='col-lg-12 background container'>
            <div>
                <label className='title__container'>
                    <div className='title__icon'>
                        <CgComment className='iconCmt' />
                    </div>
                    <h2 className='title__content'>{t('feedback.send_feedback')}</h2>
                </label>
            </div>

            <div className='col-lg-6 col-md-8 input__container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        placeholder={t('feedback.email_address')}
                        width='100%'
                        height='40px'
                        margin='0 0 16px 0'
                        {...register('email')}
                        // hasFocusBorder={true}
                    />
                    <TextArea
                        placeholder={t('feedback.describe_issue')}
                        width='100%'
                        height='120px'
                        {...register('description')}
                    />

                    <label>
                        <div className='upload__title'>
                            {t('feedback.add_screenshots')}
                        </div>
                        <div className='upload__zone'>
                            <Dropzone
                                styles={{
                                    dropzone: { overflow: 'hidden', border: 'none', borderRadius: '8px' },
                                }}
                                getUploadParams={getUploadParams}
                                onChangeStatus={handleChangeStatus}
                                accept="image/*"
                                inputContent={
                                    <div className='upload__icon'>
                                        <FaCloudUploadAlt className='iconUpload' />
                                        <span className='upload__content1'>{t('feedback.select_screenshots')}</span>
                                        <span className='upload__content2'>{t('feedback.drag_drop_screenshots')}</span>
                                    </div>
                                }
                            />
                        </div>
                    </label>

                    {/* <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                        {files.map((file) => (
                            <div key={file.name} style={{ marginRight: '10px' }}>
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            </div>
                        ))}
                    </div> */}

                    <div>
                        <Button
                            color='#FFFFFF'
                            width='136px'
                            height='40px'
                            border_radius='3px'
                            fontSize='14px'
                            margin='45px 0px 20px'
                            padding='0px 0px'
                            hover={true}
                            type='submit'
                        >
                            {t('feedback.send_feedback')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Feedback;