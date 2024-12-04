// import { FaCheckCircle } from "react-icons/fa"
import '@/containers/CoursesDetail/components/About/About.scss'

const About = ({ dataAbout }: any) => {
    return (
        <div className='about'>
            <div className='course-requirement'>
                <h3>Requirements</h3>
                <span>{dataAbout?.requirements}</span>
            </div>
            <div className='course-description'>
                <h3>Description</h3>
                <div
                    dangerouslySetInnerHTML={{ __html: dataAbout?.description || '<p>No description available.</p>' }}
                />
            </div>
            <div className='course-advance'>
                <h3>What you'll learn</h3>
                <div className='course-advance-content'>
                    {dataAbout?.studentLearn}
                </div>
            </div>
        </div>
    )
}

export default About
