
import { FcApproval } from "react-icons/fc";
import './index.scss'
import CourseApprovalTable from './components/CourseApprovalTable';
const CoursesApproval = () => {
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='am-title-cou-approval'>
                            <i className='icon-management-cou-approval'>
                                <FcApproval className='icon-slide-cou-approval' />
                            </i>
                            Course Approval
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='am-table-cou-approval'>
                            <CourseApprovalTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoursesApproval
