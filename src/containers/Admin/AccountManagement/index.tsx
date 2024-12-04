
import './index.scss'
import { FaPersonPraying } from "react-icons/fa6";
import AccManageTable from './components/AccManageTable';
const AccountManagement = () => {


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='am-title'>
                        <i className='icon-management'>
                            <FaPersonPraying className='icon-praying' />
                        </i>
                        Accounts Management
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='am-table'>
                        <AccManageTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountManagement
