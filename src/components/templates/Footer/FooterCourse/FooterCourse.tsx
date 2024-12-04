import { IoIosMenu } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toogleSidebar } from "@/modules/global/slice";
import { Button } from "@/components/atoms/Button/Button";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import "./FooterCourse.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface FooterCourseProps {
  linkDropdown: any;
}

const FooterCourse = (props: FooterCourseProps) => {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(true);

  const handleToggleSidebar = () => {
    dispatch(toogleSidebar());
  };

  /**
   * Get previous and next lesson
   */
  const { slug } = useParams();

  const currentLessonIndex = props.linkDropdown.findIndex((link: any) =>
    link.includes(slug || "")
  );
  const prevLessonLink =
    currentLessonIndex > 0 ? props.linkDropdown[currentLessonIndex - 1] : null;
  const nextLessonLink =
    currentLessonIndex < props.linkDropdown.length - 1
      ? props.linkDropdown[currentLessonIndex + 1]
      : null;
  //---------------------------End---------------------------//

  useEffect(() => {
    const timer = setTimeout(() => {
      if (disable) {
        setDisable(false);
      }
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [slug]);

  const handleEvent = () => {
    setDisable(true);
  };

  return (
    <div className="f-container">
      <div className="b-sidebar">
        <Button
          height="100%"
          width="68px"
          margin="0"
          border_radius="0"
          onClick={handleToggleSidebar}
        >
          <IoIosMenu className="menu-icon" />
        </Button>
      </div>
      <div className="b-container">
        <Link to={prevLessonLink || "#"} className="b-previous">
          <GrFormPrevious className="b-icon" /> Previous lesson
        </Link>
        <Link
          to={disable ? "#" : nextLessonLink || "#"}
          className={`b-next ${disable ? "disabled" : ""}`}
          onClick={disable ? (e) => disable && e.preventDefault() : handleEvent} //Prevent default action when the button is disabled
        >
          Next lesson <MdNavigateNext className="b-icon" />
        </Link>
      </div>
    </div>
  );
};

export default FooterCourse;
