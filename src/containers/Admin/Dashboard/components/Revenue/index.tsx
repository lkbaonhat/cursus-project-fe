import { useEffect, useState } from 'react';
import LineChart from '../Chart/Line'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectRevenueData } from '@/modules/global/selector';

const Revenue = () => {
    const dispatch = useDispatch();
    const salesData = useSelector(selectRevenueData);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    useEffect(() => {
        dispatch({ type: 'fetchRevenueData', payload: { year: selectedYear } });
    }, [dispatch, selectedYear]);
    return (
        <div className="card-sale-year">
            <div className="card-header">
                <h2>Sale Of The Year</h2>
                <div className="year-select-container">
                    <span className="year-label">Year : </span>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {Array.from({ length: new Date().getFullYear() - 2019 }, (_, i) => 2020 + i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="card-sale-year-body">
                <LineChart
                    salesLabel="Sale of the year"
                    salesData={salesData}
                    tension={0.2}
                    fill={false}
                    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                    title="Total Sales"
                    description="Monthly Sale Courses"
                    showTitle={true}
                    showDescription={true}
                />
            </div>
        </div>
    )
}

export default Revenue
