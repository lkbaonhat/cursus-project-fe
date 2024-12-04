import { RxDashboard } from "react-icons/rx";
import CarouselNews from "@/containers/StudentDashboard/Components/CarouselNews";
import NewsCurcus from "@/containers/StudentDashboard/Components/NewsCurcus";
import "./StudentDashboard.scss";

function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <div className="row">
        <div className="col-lg-12">
          <h2>
            <i className="icon">
              <RxDashboard />
            </i>
            Student Dashboard
          </h2>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6">
          <div className="card-dash">
            <div className="card-dash-left">
              <h5>Total Purchased Courses</h5>
              <h2>15</h2>
              <span className="total-purchased">New 5</span>
            </div>
            <div className="card-dash-right">
              <img
                src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1730434547/online-course_y74dkz.svg"
                alt="card-dash-img"
                className="card-dash-img"
              />
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6">
          <div className="card-dash">
            <div className="card-dash-left">
              <h5>Total Instructors Subscribing</h5>
              <h2>15</h2>
              <span className="total-subscribe">New 5</span>
            </div>
            <div className="card-dash-right">
              <img
                src="https://res.cloudinary.com/dntcdrfiq/image/upload/v1730434547/knowledge_t8oow7.svg"
                alt="card-dash-img"
                className="card-dash-img"
              />
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-6">
          <CarouselNews />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6">
          <NewsCurcus />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
