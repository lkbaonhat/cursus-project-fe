import React from 'react'
import { RiSlideshowLine } from "react-icons/ri";
import CourseManageTable from './components/CourseManageTable'
import './index.scss'
const CourseManagement = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='am-title-courses'>
                        <i className='icon-management-courses'>
                            <RiSlideshowLine className='icon-slide-courses' />
                        </i>
                        Courses Management
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='am-table-courses'>
                        <CourseManageTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseManagement
