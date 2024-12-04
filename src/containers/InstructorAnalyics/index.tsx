import SaleOfYearChart from "@/containers/InstructorAnalyics/components/SaleOfYearChart";
import { SubscribersChart } from "@/containers/InstructorAnalyics/components/SubscribersChart";
import TableCourse from "@/containers/InstructorAnalyics/components/TableCourse";
import WeeklySaleChart from "@/containers/InstructorAnalyics/components/WeeklySaleChart";
import WeeklyVisitorsChart from "@/containers/InstructorAnalyics/components/WeeklyVisitorsChart";
import { IoAnalytics } from "react-icons/io5";
import "./InstructorAnalyics.scss";

function InstructorAnalyics() {
  return (
    <>
      <div className="instructor-analyics">
        <h2 className="instructor-analyics-title">
          <i className="instructor-analyics-icon">
            <IoAnalytics />
          </i>
          Analyics
        </h2>

        <div className="chart-header-container row">
          <div className="chart-sub col-xl-4">
            <SubscribersChart />
          </div>
          <div className="chart-visit col-xl-4">
            <WeeklyVisitorsChart />
          </div>
          <div className="chart-sale col-xl-4">
            <WeeklySaleChart />
          </div>
        </div>

        <div className="sale-of-year-container col-lg-12">
          <SaleOfYearChart />
        </div>

        <div className="table-course-container">
          <TableCourse />
        </div>
      </div>
    </>
  );
}

export default InstructorAnalyics;
