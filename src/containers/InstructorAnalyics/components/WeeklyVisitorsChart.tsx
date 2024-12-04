import DualLineChart from '@/containers/InstructorAnalyics/components/Chart/DualLine';
import './WeeklyVisitorChart.scss';

function WeeklyVisitorsChart() {
  return (
    <div className="weekly-visitors-chart-wrapper">
      <DualLineChart
        newVisitors={[20, 30, 10, 40, 35, 45, 18]}
        returningVisitors={[10, 20, 30, 25, 30, 20, 40]}
        returningVisitorsLabel="Returning Visitors"
        showTotal={false}
      />
    </div>
  );
}

export default WeeklyVisitorsChart;
