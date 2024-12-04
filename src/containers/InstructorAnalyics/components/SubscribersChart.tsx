import BarChart from "@/containers/InstructorAnalyics/components/Chart/Bar";
import "./SubscribersChart.scss";

export const SubscribersChart = () => {
  return (
    <>
      <div className="subscriber-chart-wrapper">
        <BarChart
          data={[7, 4, 3, 2, 10, 26, 8, 3, 7, 56, 5, 9]}
          label="Subscribers"
          showTotal={false}
        />
      </div>
    </>
  );
};
