import CardTopCategori from "@/components/molecules/Card/CardTopCategori";
import SectionBenerfit from "@/components/molecules/Section/SectionBenerfit";
import FeaturedCourse from "@/components/organisms/Carousel/FeaturedCourse";
import Feedback from "@/components/organisms/Carousel/Feedback";
// import LiveStream from "@/components/organisms/Carousel/LiveStream";
import NewestCourses from "@/components/organisms/Carousel/NewestCourse";
import PopularInstructors from "@/components/organisms/Carousel/PopularInstructors";
import { selectStateCourses, selectStateCoursesNewest } from "@/modules/global/selector";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    const dispatch = useDispatch();

    /**
     * Get all courses
    */
    const listCourses = useSelector(selectStateCourses);
    useEffect(() => {
        dispatch({ type: 'setCourses', payload: 'approved' });
    }, []);
    //--------------------End--------------------//


    /**
     * Get all newest courses
     */
    const newestCourses = useSelector(selectStateCoursesNewest);
    useEffect(() => {
        dispatch({ type: 'setNewestCourses' });
    }, []);
    //--------------------End--------------------//


    /**
     * Get all popular instructors
     */
    useEffect(() => {
        dispatch({ type: 'setPopularInstructors' });
    }, []);
    //--------------------End--------------------//


    /**
     * Get limit reviews
     */
    useEffect(() => {
        dispatch({ type: 'setLimitReviews', payload: 5 });
    }, []);
    //--------------------End--------------------//

    return (
        <div className="home-page">
            <div className="container-fluid px-4">
                <div className="row">
                    <div className="col-xl-9 col-lg-8 mt-4">
                        {/* <LiveStream /> */}
                        <FeaturedCourse courses={listCourses} />
                        <NewestCourses courses={newestCourses} />
                        <SectionBenerfit />
                        <PopularInstructors />
                    </div>
                    
                    <div className="col-xl-3 col-lg-4">
                        <CardTopCategori />
                        {/* <CardBecomeInstructors /> */}
                    </div>
                    <div className="col-xl-12 col-lg-12">
                        <Feedback />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home