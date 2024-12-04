import { useSelector } from 'react-redux';
import './index.scss';
import { selectedSections } from '@/modules/course/selector';

const CourseContent = () => {
    const sections = useSelector(selectedSections);

    return (
        <div className="course-content-page">
            <div className="container">
                
            </div>
        </div>
    )
}

export default CourseContent