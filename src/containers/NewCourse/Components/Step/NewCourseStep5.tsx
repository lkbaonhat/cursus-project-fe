import { FiUpload } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import styled from "styled-components";
import { style } from "@/theme";

const TitleStep1 = styled.div`
    h3{
        font-size: 18px;
        font-weight: 500;
    }
`
const CourseContentStep = styled.div`
  background-color: ${style.colors.white.bg};
  padding: 20px;
  p{
    color: ${style.colors.gray.text};
    font-size: 14px;
    text-align: center;
  }
`
const NewCourseStep5 = () => {
  return (
    <div>
      <hr style={{ color: '#d1d1d1' }} />
      <TitleStep1 className="title_icon">
        <h3><FiUpload /> Basic Infomation</h3>
      </TitleStep1>
      <hr style={{ color: '#d1d1d1' }} />
      <CourseContentStep className="row">
        <div className="col-12 d-flex justify-content-center">
          <FaRegEdit size={30} />
        </div>
        <p className="col-12 mt-4">
          Your course is in a draft state. Students cannot view, purchase or enroll in this course.
          For students that are already enrolled, this course will not appear on their student Dashboard.
        </p>
      </CourseContentStep>
    </div>
  )
}

export default NewCourseStep5