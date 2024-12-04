import { useEffect, useState } from "react";
import { FaRegClosedCaptioning } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import "@/containers/CoursesDetail/index.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoPlayOutline } from "react-icons/io5";
import CoursesTab from "@/containers/CoursesDetail/components/CourseTab";
import Channel from "./components/Channel";
import { MonthYear } from "@/utils/helpers/date";
import { useCart } from "@/utils/hooks/useCart";
import { decodeJWT } from "@/utils/hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { cursusAPI } from "@/services";
import { ROUTES, STUDENT } from "@/routes";
import { toast } from "react-toastify";
import { selectIntructerProfile } from "@/modules/global/selector";
interface CourseDetail {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  language: string;
  captions: string[];
  subCategory: any;
  requirements: string;
  studentLearn: string;
  price: number;
  image: string;
  slug: string;
  author: MODEL.USER[];
  totalView: number;
  totalSold: number;
  totalErrolled: number;
  updatedAt: string;
  likes: number;
  dislikes: number;
  introVideo: string;
  isBestseller: boolean;
}

const CoursesDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("nav-about"); // Tab mặc định
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab); // Cập nhật tab đang hoạt động
  };

  /**
   * Add to cart Hook
   */
  const { addToCart } = useCart();
  //--------------------End--------------------//

  /**
   * Call API take data course detail
   */
  const [courseDetail, setCourseDetail] = useState<CourseDetail>({
    _id: "",
    title: "",
    description: "",
    shortDescription: "",
    language: "",
    captions: [],
    requirements: "",
    studentLearn: "",
    subCategory: [],
    price: 0,
    image: "",
    slug: "",
    author: [],
    totalView: 0,
    totalSold: 0,
    totalErrolled: 0,
    updatedAt: "",
    likes: 0,
    dislikes: 0,
    introVideo: "",
    isBestseller: false,
  });
  useEffect(() => {
    if (slug) {
      cursusAPI.courseService
        .getCourseDetail(slug)
        .then((res) => {
          setCourseDetail(res.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [slug]);
  //--------------------End--------------------//

  /**
   * Check user buy course
   */
  const userId = decodeJWT()?.sub;
  const [isBuyCourse, setIsBuyCourse] = useState<boolean | null>(null);
  useEffect(() => {
    if (courseDetail?._id && userId) {
      const dataGetOrderOneCourse = {
        userId: userId,
        courseId: courseDetail._id,
      };

      cursusAPI.courseService
        .findOneProgressByUserId(dataGetOrderOneCourse)
        .then((res) => {
          setIsBuyCourse(res.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (courseDetail._id) {
      dispatch({ type: "setListSections", payload: courseDetail._id });
    }
  }, [courseDetail, userId]);
  //--------------------End--------------------//

  /**
   * Update view course
   */
  useEffect(() => {
    if (courseDetail?._id) {
      cursusAPI.courseService.updateViewCourseById(courseDetail._id);
    }
  }, [courseDetail._id]);
  //--------------------End--------------------//

  /**
   * Data about course
   */
  const dataAbout = {
    requirements: courseDetail?.requirements,
    description: courseDetail?.description,
    studentLearn: courseDetail?.studentLearn,
  };
  //--------------------End--------------------//

  /**
   * Data local storage
   */
  const dataLocalStorage = {
    _id: courseDetail?._id,
    title: courseDetail?.title,
    subCategory: courseDetail?.subCategory?.[0]?.name,
    author: courseDetail?.author?.[0]?.fullname,
    price: courseDetail?.price,
    image: courseDetail?.image,
    slug: courseDetail?.slug,
    introVideo: courseDetail?.introVideo,
    isBestseller: courseDetail?.isBestseller,
  };
  //--------------------End--------------------//

  /**
   * Disable button after click
   */
  const [disabled, setDisabled] = useState<boolean>(false);
  useEffect(() => {
    if (disabled) {
      setTimeout(() => {
        setDisabled(false);
      }, 800);
    }
  }, [disabled]);

  const handleDisabled = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(dataLocalStorage);
    setDisabled(true);
  };
  const userJWT = decodeJWT();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(dataLocalStorage);
    if (userJWT?.sub) {
      navigate(`/shoppingcart`);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  //--------------------End--------------------//
  //--------------------getAverageRating------------------------//
  const [averageRating, setAverageRating] = useState<number>(0);
  const [numberOfRating, setNumberOfRating] = useState<number>(0);
  useEffect(() => {
    if (slug) {
      cursusAPI.reviewService
        .getAverageRatingBySlug(slug)
        .then((res) => {
          setAverageRating(res.data.data.averageRating);
          setNumberOfRating(res.data.data.numberOfRatings);
        })
        .catch((err) => {
          console.error("Error fetching average rating:", err);
        });
    }
  }, [slug]);

  //--------------------End--------------------//
  //--------------------introVideo------------------------//
  const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);
  const handleOverlayClose = () => {
    setOverlayVisible(false);
  };

  const handleShowOverlay = () => {
    if (courseDetail?.introVideo) {
      setOverlayVisible(true);
    } else {
      toast.error("This course does not have a preview video!");
    }
  };
  //--------------------End--------------------//

  const user = useSelector(selectIntructerProfile);
  return (
    <>
      <div className="courses-detail">
        {isOverlayVisible && (
          <div className="overlay-container">
            <div className="overlay-background"></div>

            <div className="overlay-content">
              <iframe
                src={`https://www.youtube.com/embed/${courseDetail?.introVideo.split("v=")[1]?.split("&")[0]
                  }`}
                title="Course Preview"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="video-iframe"
              ></iframe>
              <button
                className="close-btn"
                onClick={() => handleOverlayClose()}
              >
                ✕
              </button>
            </div>
          </div>
        )}
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='courses-detail-content'>
                <div className='row'>
                  <div className='col-xl-4 col-lg-5 col-md-6'>
                    <div className='preview-video' onClick={handleShowOverlay}>

                      <a href='#' className='focus-img'>
                        <img src={courseDetail?.image} alt='Course Preview' />

                        <div className='course-overlay'>
                          {courseDetail?.isBestseller && (
                            <div className="badge_seller">Bestseller</div>
                          )}
                          <span className="icon-play">
                            <IoPlayOutline className="icon-main" />
                          </span>
                          <span className="preview">Preview this course</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-8 col-lg-7 col-md-6">
                    <div className="course-title">
                      <h2>{courseDetail?.title}</h2>
                      <span>{courseDetail?.shortDescription}</span>
                    </div>
                    <div className="course-feedback">
                      <div className="course-rating">
                        <FaRegStar className="icon-star" />
                        {averageRating || 0}
                      </div>
                      ({numberOfRating} ratings)
                    </div>
                    <div className="course-enroll">
                      {courseDetail?.totalSold} students enrolled
                    </div>
                    <div className="course-language">
                      <div className="language">
                        <span>
                          <FaRegComment className="icon-translate" />
                        </span>
                        <span>{courseDetail?.language?.[0]}</span>
                      </div>
                      <div className="subtitle">
                        <span>
                          <FaRegClosedCaptioning />
                        </span>
                        <span>
                          {`${courseDetail?.captions?.[0]}, ${courseDetail?.captions?.[1]}`}

                          {courseDetail?.captions?.length > 2 && (
                            <span className="caption_tooltip">
                              {courseDetail?.captions?.length - 2} more
                              <span className="caption-content">
                                {courseDetail.captions
                                  .slice(2)
                                  .map((caption, index) => (
                                    <span key={index}>{caption}</span>
                                  ))}
                              </span>
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="course-date">
                      Last updated {MonthYear(courseDetail?.updatedAt)}
                    </div>
                    {(isBuyCourse === undefined) || (courseDetail?.author[0]?._id === userId) ? undefined : isBuyCourse ? (
                      <Link
                        to={`/${user?.role}/${STUDENT.COURSE_CONTENT.replace(
                          ":courseSlug",
                          courseDetail._id
                        )}`}
                        className="btn-learn"
                      >
                        Learn
                      </Link>
                    ) : (
                      <>
                        <div className="button-payment">
                          <div className="cart">
                            <button
                              className="btn-cart"
                              disabled={disabled}
                              onClick={(e) => handleDisabled(e)}
                            >
                              Add to Cart
                            </button>
                          </div>
                          <div className="buy">
                            <button
                              className="btn-buy"
                              onClick={(e) => handleBuyNow(e)}
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                        <div className="other">30-Day Money-Back Guarantee</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="channel-info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Channel
                author={courseDetail?.author[0]}
                view={courseDetail.totalView}
                courseId={courseDetail._id}
                likes={courseDetail.likes}
                dislikes={courseDetail.dislikes}
                role={courseDetail?.author[0]?.role}
              />
              <div className="course-tab">
                <nav>
                  <div className="nav nav-tabs" id="myTab" role="tablist">
                    <a
                      className={`nav-link ${activeTab === "nav-about" ? "active" : ""
                        }`}
                      onClick={() => handleTabClick("nav-about")}
                      role="tab"
                      aria-controls="nav-about"
                      aria-selected={activeTab === "nav-about"}
                    >
                      About
                    </a>
                    <a
                      className={`nav-link ${activeTab === "nav-courses" ? "active" : ""
                        }`}
                      onClick={() => handleTabClick("nav-courses")}
                      role="tab"
                      aria-controls="nav-courses"
                      aria-selected={activeTab === "nav-courses"}
                    >
                      Courses Content
                    </a>
                    <a
                      className={`nav-link ${activeTab === "nav-reviews" ? "active" : ""
                        }`}
                      onClick={() => handleTabClick("nav-reviews")}
                      role="tab"
                      aria-controls="nav-reviews"
                      aria-selected={activeTab === "nav-reviews"}
                    >
                      Feedback
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="courses-more-info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <CoursesTab
                activeTab={activeTab}
                dataAbout={dataAbout}
                courseId={courseDetail._id}
                isBuyCourse={isBuyCourse}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesDetail;
