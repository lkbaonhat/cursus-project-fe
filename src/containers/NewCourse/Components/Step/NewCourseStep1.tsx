import ButtonSelection from "@/components/ButtonDropDown/ButtonSelection";
import MyCKEditor from "@/components/CkEditor/CkEditor";
import ButtonDropdownSelection from "@/components/SelectionDropDown/SelectionDropDown";
import { selectedLanguages, selectedLevels } from "@/modules/course/selector";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { MdInfoOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import styled from "styled-components";

//interface
interface StepForm1 {
    title: string;
    shortDescription: string;
    description: string;
    studentLearn: string;
    requirements: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    levels: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    language: any[];
    subCategoryId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    captions: any[];
    useId: string;
}

interface NewCourseStep1Props {
    control: Control<StepForm1>;
    error: FieldErrors<StepForm1>;
}

const Container = styled.div`
    background-color: white;
    padding: 30px;
`;

const TitleStep1 = styled.div`
    h3{
        font-size: 18px;
        font-weight: 500;
    }
`

const Title = styled.div`
    font-size: 14px;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 10px !important;
    color: #333;
    text-align: left;
    display: block;
    margin-top: 30px;
`

const HeplpBlock = styled.div`
    display: block;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 0px;
    color: #686f7a;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    text-align: left;
`

const TextFiled = styled.div`
    input{
        padding-left: 1em !important;
        padding-right: 2em !important;
        height: 40px !important;
        font-size: 14px;
        font-weight: 400;
        font-family: 'Roboto', sans-serif;
        width: 100%;
        border: 1px solid #e5e5e5;
        &:focus-within{
            outline: 1px solid #e5e5e5;

        }
    }
    textarea{
        padding: 10px;
        font-size: 14px;
        color: black;
        font-weight: 400;
        min-height: 120px;
        width: 100%;
        border: 1px solid #e5e5e5;
        &:focus-within{
            outline: 1px solid #e5e5e5;

        }
    }
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NewCourseStep1: React.FC<NewCourseStep1Props> = ({ control, error }: any) => {

    const selecterLevels = useSelector(selectedLevels);
    const selecterLanguage = useSelector(selectedLanguages);

    return (
        <div className="step_tap_info">
            <div className="tab_from_content">
                <hr style={{ color: '#d1d1d1' }} />
                <TitleStep1 className="title_icon">
                    <h3><MdInfoOutline /> Basic Infomation</h3>
                </TitleStep1>
                <hr style={{ color: '#d1d1d1' }} />
                <div className="course_form">
                    <div className="general_info">

                        {/* Form step 1 */}
                        <Container>
                            <div className="row">
                                <div className="course-title col-lg-12 col-md-12">
                                    <Title className="title">
                                        <label>Course Title*</label>
                                    </Title>
                                    <TextFiled className="text-field">
                                        <Controller
                                            name="title"
                                            control={control}
                                            rules={{
                                                required: 'Title is required', maxLength: {
                                                    value: 60,
                                                    message: 'Title is too long'
                                                },
                                            }}
                                            render={({ field }) => <input {...field} type="text"
                                                placeholder="Course title here" height="40px" />
                                            }
                                        />
                                        {error.title &&
                                            <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                                {error.title.message}
                                            </span>
                                        }
                                    </TextFiled>
                                    <HeplpBlock className="help-block">(Please make this a maximum of 100 characters and unique.)</HeplpBlock>
                                </div>
                                <div className="short-description col-lg-12 col-md-12">
                                    <Title className="title">
                                        <label>Short Description*</label>
                                    </Title>
                                    <TextFiled className="text-field">
                                        <Controller
                                            name="shortDescription"
                                            control={control}
                                            rules={{
                                                required: 'Short Description is required',
                                            }}
                                            render={({ field }) =>
                                                <textarea minLength={220} {...field} placeholder="Item description here ..." />
                                            } />
                                        {error.shortDescription &&
                                            <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                                {error.shortDescription.message}
                                            </span>
                                        }
                                    </TextFiled>
                                    <HeplpBlock className="help-block">(220 words)</HeplpBlock>
                                </div>
                                <div className="course-description col-lg-12 col-md-12">
                                    <Title className="title">
                                        <label>Course Description*</label>
                                    </Title>
                                    <TextFiled className="text-field">
                                        <Controller
                                            name="description"
                                            control={control}
                                            rules={{
                                                required: 'Description is required',
                                            }}
                                            render={({ field }) =>
                                                <MyCKEditor value={field.value} onChange={field.onChange} />
                                            }
                                        />
                                        {error.description &&
                                            <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                                {error.description.message}
                                            </span>
                                        }
                                    </TextFiled>
                                </div>

                                {/* What will students learn in your course */}
                                <div className="course-price col-lg-6 col-md-12">
                                    <Title className="title">
                                        <label>What will students learn in your course?*</label>
                                    </Title>
                                    <TextFiled className="text-field">
                                        <Controller
                                            name="studentLearn"
                                            control={control}
                                            rules={{
                                                required: 'Reason student should learn is required',
                                            }}
                                            render={({ field }) =>
                                                <textarea minLength={220} {...field} />
                                            } />
                                        {error.studentLearn &&
                                            <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>
                                                {error.studentLearn.message}
                                            </span>
                                        }
                                    </TextFiled>
                                    <HeplpBlock className="help-block">Student will gain this skills, knowledge after completing this course. (One per line).</HeplpBlock>
                                </div>

                                <div className="course-price col-lg-6 col-md-12">
                                    <Title className="title">
                                        <label>Requirements*</label>
                                    </Title>
                                    <TextFiled className="text-field">
                                        <Controller
                                            name="requirements"
                                            control={control}
                                            rules={{
                                                required: 'Requirements knonwledge is required',
                                            }}
                                            render={({ field }) =>
                                                <textarea minLength={220} {...field} />
                                            }
                                        />
                                        {error.requirements && <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{error.requirements.message}</span>}
                                    </TextFiled>
                                    <HeplpBlock className="help-block">What knowledge, technology, tools required by users to start this course. (One per line).</HeplpBlock>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <Title className="title">
                                        <label>Course Level*</label>
                                    </Title>
                                    <Controller
                                        name="levels"
                                        control={control}
                                        rules={{
                                            required: 'Level is required',
                                        }}
                                        render={({ field }) => (
                                            <ButtonDropdownSelection
                                                value={field.value}
                                                placeholder="Nothing Selected"
                                                options={selecterLevels}
                                                onChange={(selectedValues) => field.onChange(selectedValues)} // Connect to Controller

                                            />
                                        )}
                                    />
                                    {error.levels && <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{error.levels.message}</span>}
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <Title className="title">
                                        <label>Audio Language*</label>
                                    </Title>
                                    <div>
                                        <Controller
                                            name="language"
                                            control={control}
                                            rules={{
                                                required: 'Language is required',
                                            }}
                                            render={({ field }) => (
                                                <ButtonDropdownSelection
                                                    value={field.value}
                                                    placeholder="Select Audio"
                                                    options={selecterLanguage}
                                                    onChange={(selectedValues) => field.onChange(selectedValues)} // Connect to Controller

                                                />
                                            )}
                                        />
                                        {error.language && <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{error.language.message}</span>}
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <Title className="title">
                                        <label>Close Caption*</label>
                                    </Title>
                                    <Controller
                                        name="captions"
                                        control={control}
                                        rules={{
                                            required: 'Caption is required',
                                        }}
                                        render={({ field }) => (
                                            <ButtonDropdownSelection
                                                value={field.value}
                                                placeholder="Select Caption"
                                                options={selecterLanguage}
                                                onChange={(selectedValues) => field.onChange(selectedValues)} // Connect to Controller

                                            />
                                        )}
                                    />
                                    {error.captions && <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{error.captions.message}</span>}
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <Title className="title">
                                        <label>Course Category*</label>
                                    </Title>
                                    <Controller
                                        name="subCategoryId"
                                        control={control}
                                        rules={{
                                            required: 'Category is required',
                                        }}
                                        render={({ field }) => (
                                            <ButtonSelection
                                                value={field.value}
                                                placeholder="Select Category"
                                                onChange={(selectedValues) => field.onChange(selectedValues)} // Pass the selected values to Controller
                                            />
                                        )}
                                    />
                                    {error.subCategoryId && <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{error.subCategoryId.message}</span>}
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewCourseStep1;
