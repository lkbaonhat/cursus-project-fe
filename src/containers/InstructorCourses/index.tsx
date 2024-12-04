import ButtonCourse from '@/containers/InstructorCourses/Components/ButtonCourse'
import { FiBook, FiDownload, FiUpload } from 'react-icons/fi'
// import { GoTag } from 'react-icons/go'
// import { TbSpeakerphone } from 'react-icons/tb'
import MyCourses from '@/containers/InstructorCourses/Components/MyCourses'
import MyPurchases from '@/containers/InstructorCourses/Components/MyPurchases'
import UpComingCourses from '@/containers/InstructorCourses/Components/UpComingCourses'
// import Discounts from '@/containers/InstructorCourses/Components/Discounts'
import TabCol3 from '@/containers/InstructorCourses/Components/TabCol3'
// import Promotion from '@/containers/InstructorCourses/Components/Promotion'
import './InstructorCourse.scss'

export const Courses = () => {

    const tabsData = [
        { index: 1, name: "My Courses", state: true, icon: <FiBook />, component: <MyCourses /> },
        { index: 2, name: "My Purchases", state: false, icon: <FiDownload />, component: <MyPurchases /> },
        { index: 3, name: "Upcoming Courses", state: false, icon: <FiUpload />, component: <UpComingCourses /> },
        // { index: 4, name: "Discounts", state: false, icon: <GoTag />, component: <Discounts /> },
        // { index: 5, name: "Promotions", state: false, icon: <TbSpeakerphone />, component: <Promotion /> },
      ];

  return (
    <>
    
        <div className='instructor__courses col-lg-12'>
            <div className='courses_title'>
                <div className='courses__icon'>
                    <FiBook className='iconCourse' />
                </div>
                <h2 className='courses__content'>Courses</h2>
            </div>

            <div className='header'>
                <div className='header__title'>
                    <div className='header__icon'>
                        <FiBook className='iconHeader' />
                    </div>
                    <h2 className='header__content'>Jump Into Course Creation</h2>
                </div>
                <ButtonCourse />
            </div>

            <div className='nav-tab'>
                <TabCol3 tabs={tabsData} />
            </div>
        </div>

    </>
  )
}
