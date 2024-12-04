import "./index.scss"
import { IoAnalytics } from "react-icons/io5";

import AccountsChart from './components/AccountsChart';
import Revenue from "./components/Revenue";
import VisitorChart from "./components/VisitorChart";
import SaleChart from "./components/SaleChart";
import UserEngagement from "./components/UserEngagement";
const Dashboard = () => {
    return (
        <div className='dashboard-main'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <h2 className='dashboard-admin-title'>
                            <i className="icon-analyst">
                                <IoAnalytics />
                            </i>
                            Analytics
                        </h2>
                    </div>
                </div>
                <UserEngagement />

 
                <div className='row'>
                    <div className='col-xl-4 col-sm-6'>
                        <AccountsChart />
                    </div>
                    <div className='col-xl-4 col-sm-6'>
                        <VisitorChart />
                    </div>
                    <div className='col-xl-4 col-sm-6'>
                        <SaleChart />
                    </div>

                </div>
                <div className="row">
                    <div className="col-xl-12 col-md-12">
                        <Revenue />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
