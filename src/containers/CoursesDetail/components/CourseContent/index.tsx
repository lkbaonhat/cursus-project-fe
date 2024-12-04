import "@/containers/CoursesDetail/components/CourseContent/index.scss";
import LectureContent from "../LectureContent";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectStateListSections } from "@/modules/global/selector";

const CourseContent = () => {
  const [isExpandedAll, setIsExpandedAll] = useState(false);
  const [visibleSections, setVisibleSections] = useState(5);
  const listSections = useSelector(selectStateListSections);
  const listLectures =
    listSections && listSections.flatMap((section) => section.listLecture);

  const toggleExpandAll = () => {
    if (isExpandedAll) {
      setIsExpandedAll(false);
      setVisibleSections(5);
    } else {
      setIsExpandedAll(true);
      setVisibleSections(listSections ? listSections.length : 0); // Show all sections
    }
  };

  return (
    <div className="course-content">
      <h3>Courses Content</h3>
      <div className="course-content-right">
        <div className="expand" onClick={toggleExpandAll}>
          <span>{isExpandedAll ? "Collapse all" : "Expand all"}</span>
        </div>
        <div className="lecture">
          <span className="pe-1">{listLectures ? listLectures.length : 0}</span>
          lectures
        </div>
        <div className="lecture-time">
          <span>99:99:99</span>
        </div>
      </div>
      <LectureContent
        isExpandedAll={isExpandedAll}
        visibleSections={visibleSections}
        setVisibleSections={setVisibleSections}
      />
    </div>
  );
};

export default CourseContent;
