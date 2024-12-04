import React from "react";
import "@/containers/CoursesDetail/components/CourseTab/CoursesTab.scss";
import CourseContent from "@/containers/CoursesDetail/components/CourseContent";
import About from "@/containers/CoursesDetail/components/About";
import Reviews from "@/containers/CoursesDetail/components/Reviews";

interface CoursesTabProps {
  activeTab: string;
  dataAbout?: any;
  courseId?: string;
  isBuyCourse?: boolean | null;
}

const CoursesTab: React.FC<CoursesTabProps> = ({ ...props }) => {
  return (
    <div className="tab-content" id="nav-tabContent">
      <div
        className={`tab-pane fade ${props.activeTab === "nav-about" ? "show active" : ""
          }`}
        id="nav-about"
        role="tabpanel"
        aria-labelledby="nav-about-tab"
      >
        <About dataAbout={props.dataAbout} />
      </div>
      <div
        className={`tab-pane fade ${props.activeTab === "nav-courses" ? "show active" : ""
          }`}
        id="nav-courses"
        role="tabpanel"
        aria-labelledby="nav-courses-tab"
      >
        <CourseContent />
      </div>
      <div
        className={`tab-pane fade ${props.activeTab === "nav-reviews" ? "show active" : ""
          }`}
        id="nav-reviews"
        role="tabpanel"
        aria-labelledby="nav-reviews-tab"
      >
        <Reviews courseId={props.courseId || ''} isBuyCourse={props.isBuyCourse ?? null} />
      </div>
    </div>
  );
};

export default CoursesTab;
