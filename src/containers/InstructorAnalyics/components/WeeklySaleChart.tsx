import LineChart from "@/containers/InstructorAnalyics/components/Chart/Line";
import "./WeeklySaleChart.scss";

function WeeklySaleChart() {
  return (
    <div className="weekly-sale-chart-wrapper">
      <LineChart
        salesData={[1200, 1500, 900, 2000, 1800, 2200, 3000]}
        salesLabel="Weekly Sales"
        fill={true}
        labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        showTotal={false}
      />
    </div>
  );
}

export default WeeklySaleChart;
