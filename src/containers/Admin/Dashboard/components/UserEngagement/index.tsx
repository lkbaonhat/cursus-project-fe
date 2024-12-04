import { useEffect } from 'react';
import './index.scss';
import { FaCheckCircle } from 'react-icons/fa';
import { MdTimelapse } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveUsersCount, selectAverageProgress, selectCompletionRate, selectTotalReviewsCount } from '@/modules/global/selector';


const UserEngagement = () => {
    const dispatch = useDispatch();
    const activeUsersCount = useSelector(selectActiveUsersCount);
    const totalReviewsCount = useSelector(selectTotalReviewsCount);
    const completionRate = useSelector(selectCompletionRate);
    const averageProgress = useSelector(selectAverageProgress);
    useEffect(() => {
        dispatch({ type: 'fetchActiveUsersCount' });
        dispatch({ type: 'fetchTotalReviewsCount' });
        dispatch({ type: 'fetchCompletionRate' });
        dispatch({ type: 'fetchAverageProgress' });
    }, [dispatch]);

    const renderValue = (value: number | undefined, suffix: string = '') => {

        return value !== undefined ? `${value}${suffix}` : 'N/A';
    };
    return (
        <div className='row'>
            <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card-dash">
                    <div className="card-dash-left">
                        <h5>Completion Rate</h5>
                        <h2>{renderValue(completionRate, '%')}</h2>
                    </div>
                    <div className='card-dash-right'>
                        <FaCheckCircle className="engagement-icon" />
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card-dash">
                    <div className="card-dash-left">
                        <h5>Average Study Progress</h5>
                        <h2>{renderValue(averageProgress, '%')}</h2>
                    </div>
                    <div className='card-dash-right'>
                        <MdTimelapse className="engagement-icon-time" />
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card-dash">
                    <div className="card-dash-left">
                        <h5>Total Reviews</h5>
                        <h2>{renderValue(totalReviewsCount)}</h2>
                    </div>
                    <div className='card-dash-right'>
                        <MdOutlineRateReview className="engagement-icon-review" />
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
                <div className="card-dash">
                    <div className="card-dash-left">
                        <h5>Active Users</h5>
                        <h2>{renderValue(activeUsersCount)}</h2>
                    </div>
                    <div className='card-dash-right'>
                        <FaUser className="engagement-icon-user" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserEngagement;
