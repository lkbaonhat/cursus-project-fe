
import { useEffect, useState } from 'react';
import DualLineChart from '../Chart/DualLine'
import { cursusAPI } from '@/services';

const VisitorChart = () => {
    const [newVisitors, setNewVisitors] = useState<number[]>([]);
    const [returningVisitors, setReturningVisitors] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    useEffect(() => {
        const fetchYearlyVisitors = async () => {
            try {
                const response = await cursusAPI.dashboardService.getVisitorsByMonth();
                const data = response.data.data;

                // Lấy tên các tháng
                const labelsData = [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                ];
                const newVisitorData = data.map((item: any) => parseInt(item.newUsers, 10));
                const returningVisitorData = data.map((item: any) => parseInt(item.returningUsers, 10));

                setLabels(labelsData);
                setNewVisitors(newVisitorData);
                setReturningVisitors(returningVisitorData);
            } catch (error) {
                console.error('Error fetching yearly visitors:', error);
            }
        };

        fetchYearlyVisitors();
    }, []);
    return (
        <div className='analysis-card'>
            <div className='card-body'>
                <div className='chartjs-wrapper'>
                    <DualLineChart
                        labels={labels}
                        newVisitors={newVisitors}
                        returningVisitors={returningVisitors}
                        returningVisitorsLabel="Returning Visitors"
                    />

                </div>
            </div>
        </div>
    )
}

export default VisitorChart
