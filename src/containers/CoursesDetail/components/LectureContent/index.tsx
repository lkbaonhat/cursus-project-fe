import { useState } from "react";
import { FiFile } from "react-icons/fi";
import { RiSlideshow2Line } from "react-icons/ri";
import "@/containers/CoursesDetail/components/LectureContent/index.scss";
import { useSelector } from "react-redux";
import { selectStateListSections } from "@/modules/global/selector";

function LectureContent({
  isExpandedAll,
  visibleSections,
  setVisibleSections,
}: {
  isExpandedAll: boolean;
  visibleSections: number;
  setVisibleSections: any;
}) {
  const [expandedSectionIndex, setExpandedSectionIndex] = useState<
    number | null
  >(null);
  const listSections = useSelector(selectStateListSections);

  const toggleAccordion = (index: number) => {
    setExpandedSectionIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const showMoreSections = () => {
    setVisibleSections(
      (prevVisibleSections: number) => prevVisibleSections + 5
    );
  };

  return (
    <div>
      {listSections &&
        listSections.slice(0, visibleSections).map((section, index) => (
          <div key={index} className="lecture-content">
            <a onClick={() => !isExpandedAll && toggleAccordion(index)}>
              <div className="section-header-left">
                <span className="section-title-wrapper">
                  <i className="icon-courses">
                    <RiSlideshow2Line />
                  </i>
                  <span className="section-title-text">{section.name}</span>
                </span>
              </div>
              <div className="section-header-right">
                <span className="num-items-in-section">
                  {section.listLecture.length} lectures
                </span>
                <span className="section-header-length">
                  {section.sectionTime}
                </span>
              </div>
            </a>

            <div
              className={`accordion-content ${
                isExpandedAll || expandedSectionIndex === index ? "show" : ""
              }`}
            >
              {section.listLecture.map((lecture: any, idx: any) => (
                <div key={idx} className="lecture-container">
                  <div className="left-content">
                    <i className="icon-file">
                      <FiFile />
                    </i>
                    <div className="top">
                      <div className="title">{lecture.title}</div>
                    </div>
                  </div>
                  <div className="details">
                    <span className="content-summary">{lecture.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      {listSections &&
        visibleSections < listSections.length &&
        !isExpandedAll && (
          <a className="btn-show-more" onClick={showMoreSections}>
            Show more
          </a>
        )}
    </div>
  );
}

export default LectureContent;
