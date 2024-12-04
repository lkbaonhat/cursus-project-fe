import { Button } from "@/containers/Feedback/components/Button";
import { INSTRUCTOR, ROLE } from "@/routes";
import { FiBook } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import CarouselLatestCourses from "@/containers/InstructorDashboard/Components/CarouselLatestCourses";
import CarouselNews from "@/containers/InstructorDashboard/Components/CarouselNews";
import ProfileAnalystics from "@/containers/InstructorDashboard/Components/ProfileAnalystics";
import "./InstructorDashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectStateAnalyticInsDashboard } from "@/modules/global/selector";
import { useEffect } from "react";

function InstructorDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectInformation = useSelector(selectStateAnalyticInsDashboard);

  useEffect(() => {
    dispatch({ type: "getInforCourseDashboard" });
  }, [dispatch]);

  return (
    <div className="container instructor-dashboard">
      <div className="row">
        <div className="col-lg-12">
          <div className="instructor-dashboard-title">
            <i className="title-icon">
              <RxDashboard className="title-iconDashboard" />
            </i>
            <p className="title-content">Instructor Dashboard</p>
          </div>
        </div>

        <div className="col-xl-3 col-lg-3 col-sm-12">
          <div className="instructor-statistics-item">
            <div className="instructor-statistics-item-left">
              <h5 className="instructor-statistics-item-text-title">
                Total Sales
              </h5>
              <h2 className="instructor-statistics-item-text-value">
                {selectInformation?.totalSales?.total.toLocaleString() || "N/A"} VND
              </h2>
              <span className="instructor-statistics-item-text-value-sale">
                New {selectInformation?.totalSales?.new.toLocaleString() || "N/A"} VND
              </span>
            </div>
            <div className="instructor-statistics-item-right">
              <img
                src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1730434547/achievement_tb7voc.svg"
                className="image-item"
              />
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-3 col-sm-12">
          <div className="instructor-statistics-item">
            <div className="instructor-statistics-item-left">
              <h5 className="instructor-statistics-item-text-title">
                Total Enroll
              </h5>
              <h2 className="instructor-statistics-item-text-value">
                {selectInformation?.totalEnroll?.total || "N/A"}
              </h2>
              <span className="instructor-statistics-item-text-value-enroll">
                New {selectInformation?.totalEnroll?.new || "N/A"}
              </span>
            </div>
            <div className="instructor-statistics-item-right">
              <img
                src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1730434547/graduation-cap_zygfsw.svg"
                className="image-item"
              />
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-3 col-sm-12">
          <div className="instructor-statistics-item">
            <div className="instructor-statistics-item-left">
              <h5 className="instructor-statistics-item-text-title">
                Total Courses
              </h5>
              <h2 className="instructor-statistics-item-text-value">
                {selectInformation?.totalCourses?.total || "N/A"}
              </h2>
              <span className="instructor-statistics-item-text-value-courses">
                New {selectInformation?.totalCourses?.new || "N/A"}
              </span>
            </div>
            <div className="instructor-statistics-item-right">
              <img
                src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1730434547/online-course_y74dkz.svg"
                className="image-item"
              />
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-3 col-sm-12">
          <div className="instructor-statistics-item">
            <div className="instructor-statistics-item-left">
              <h5 className="instructor-statistics-item-text-title">
                Total Students
              </h5>
              <h2 className="instructor-statistics-item-text-value">
                {selectInformation?.totalStudents?.total || "N/A"}
              </h2>
              <span className="instructor-statistics-item-text-value-student">
                New {selectInformation?.totalStudents?.new || "N/A"}
              </span>
            </div>
            <div className="instructor-statistics-item-right">
              <img
                src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1730434547/knowledge_t8oow7.svg"
                className="image-item"
              />
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="card-dash">
            <div className="card-dash-title">
              <div className="card-dash-title-icon">
                <FiBook className="card-dash-icon" />
              </div>
              <h2 className="card-dash-title-text">
                Jump Into Course Creation
              </h2>
            </div>

            <div className="card-dash-title-button">
              <Button
                width="160px"
                border_radius="3px"
                onClick={() =>
                  navigate(`/${ROLE.INSTRUCTOR}/${INSTRUCTOR.CREATE_COURSE}`)
                }
              >
                Create Your Course
              </Button>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-12">
          <div className="latest-carousel">
            <CarouselLatestCourses />
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-12">
          <div className="news-carousel">
            <CarouselNews />
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-12">
          <div className="profile-analystics">
            <ProfileAnalystics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
