import LineChart from '@/containers/InstructorAnalyics/components/Chart/Line';
import './SaleOfYearChart.scss';

function SaleOfYearChart() {
  return (
    <div className='sale-of-year'>
        <div className='title'>
            <h2>Sale Of The Year</h2>
        </div>
        <div className='sale-of-year-chart-wrapper'>
            <LineChart
                salesLabel='Sale of the year'
                salesData={[1200, 200, 900, 2000, 1800, 2200, 3000, 2000, 1000, 2300, 4000, 1540]}
                tension={0.2}
                fill={false}
                label='Sale of the year'
                labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
            />
        </div>
    </div>
  )
}

export default SaleOfYearChart