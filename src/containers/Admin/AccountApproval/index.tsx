import React from 'react'
import { FcApproval } from "react-icons/fc";
import './index.scss'
import AccountApprovalTable from './components/AccountApprovalTable';
const AccountApproval = () => {
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='am-title-acc-approval'>
                            <i className='icon-management-acc-approval'>
                                <FcApproval className='icon-slide-acc-approval' />
                            </i>
                            Account Approval (Upgrade to instructor)
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='am-table-acc-approval'>
                            <AccountApprovalTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountApproval
