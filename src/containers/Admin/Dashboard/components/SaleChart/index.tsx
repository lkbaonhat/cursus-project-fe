import { useEffect, useState } from 'react';
import LineChart from '../Chart/Line'
import { useDispatch, useSelector } from 'react-redux';
import { selectWeeklyRevenueData } from '@/modules/global/selector';


const SaleChart = () => {
    const dispatch = useDispatch();
    const salesData = useSelector(selectWeeklyRevenueData);


    useEffect(() => {
        dispatch({ type: 'fetchWeeklyRevenueData' });
    }, [dispatch]);
    return (
        <div className='analysis-card'>
            <div className='card-body'>
                <div className='chartjs-wrapper'>
                    <LineChart
                        salesData={salesData}
                        salesLabel="Weekly Sales"
                        fill={true}
                        labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                        title="Total Sales"
                        description="Weekly Sale Courses"
                        showTitle={true}
                        showDescription={true}
                    />

                </div>
            </div>
        </div>
    )
}

export default SaleChart
