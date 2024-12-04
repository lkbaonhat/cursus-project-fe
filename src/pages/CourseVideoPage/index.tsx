import CourseVideo from "@/containers/Course/Video";
import { selectedLecture } from "@/modules/course/selector";
import { useSelector } from "react-redux";

const CourseVideoPage = () => {

    /**
     * Get lecture by lecture id
     */
    const lecture = useSelector(selectedLecture);
    //---------------------------End---------------------------//


    /**
     * split video id from video url
     * @param url 
     * @returns 
     */
    const extractVideoId = (url: string) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([\w-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const videoId = lecture?.videoUrl ? extractVideoId(lecture?.videoUrl) : null;
    //---------------------------End---------------------------//

    return (
        <>
            <CourseVideo title={lecture?.title || ''} description={lecture?.description || ''} videoId={videoId || ''} />
        </>
    )
}

export default CourseVideoPage;