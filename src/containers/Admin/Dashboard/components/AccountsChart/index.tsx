import { useEffect } from 'react';
import "./index.scss";
import BarChart from '../Chart/Bar';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonthlyUserCounts } from '@/modules/global/selector';


const AccountsChart = () => {
    const dispatch = useDispatch();
    const monthlyUserCounts = useSelector(selectMonthlyUserCounts);
    useEffect(() => {
        dispatch({ type: "fetchMonthlyUserCounts" });
    }, [dispatch]);

    return (
        <div className='analysis-card'>
            <div className='card-body'>
                <div className='chartjs-wrapper'>
                    <BarChart data={monthlyUserCounts} label="Monthly Accounts" />
                </div>
            </div>
        </div>
    );
}

export default AccountsChart;
