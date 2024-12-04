import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoPlayOutline } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import {
  CardContainer,
  BestsellerBadge,
  CourseImage,
  InfoSection,
  InstructorSection,
  RatingBadge,
  TitleSection,
  TopSection,
  IconPlay,
  PurchasedBadge,
} from "@/components/molecules/Card/CardCourse/StyledComponents";
import { ROUTES } from "@/routes";
import { useCart } from "@/utils/hooks/useCart";
import { decodeJWT } from "@/utils/hooks/useUser";
import { cursusAPI } from "@/services";

//done
const CardCourse = (
  props: MODEL.CardProps & MODEL.IStyleProps & MODEL.ImageProps & MODEL.COURSE
) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const width = ref.current.offsetWidth;
      props.onWidthChange?.(width);
    }
  }, [props.width]);

  /**
   * Data local storage
   */
  const dataLocalStorage: any = {
    _id: props._id,
    title: props.title,
    subCategory: props?.subCategory?.name,
    author: props.author,
    price: props.price,
    image: props.image,
    slug: props.slug,
    createdAt: props.createdAt,
  };
  //--------------------End--------------------//

  /**
   * Disable button after click
   */
  const { addToCart } = useCart();

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
  //--------------------End--------------------//

  /**
   * Check user buy course
   */
  const userId = decodeJWT()?.sub;
  const [isBuyCourse, setIsBuyCourse] = useState(null);

  useEffect(() => {
    if (props._id && userId) {
      const dataGetOrderOneCourse = {
        userId: userId,
        courseId: props._id,
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
  }, [props._id, userId]);
  //--------------------End--------------------//

  //--------------------getAverageRating------------------------//
  const [averageRating, setAverageRating] = useState<number>(0);
  useEffect(() => {
    if (props._id) {
      cursusAPI.reviewService
        .getAverageRatingByCourseId(props._id)
        .then((res) => {
          setAverageRating(res.data.data.averageRating);
        })
        .catch((err) => {
          console.error("Error fetching average rating:", err);
        });
    }
  }, [props._id]);
  //--------------------End--------------------//
  return (
    <CardContainer
      width={props.width}
      height={props.height}
      ref={ref}
      className={props.className ? "row" : ""}
    >
      <div className={props.className ? "col-md-4 p-0" : ""}>
        <TopSection>
          <RatingBadge bestseller={props.bestseller}>
            <CiStar style={{ marginRight: "4px", fontSize: "18px" }} />{" "}
            {averageRating || 0}
          </RatingBadge>
          <Link
            to={`${ROUTES.COURSE_DETAIL.replace(":slug", props.slug ?? "")}`}
          >
            <CourseImage src={props.image} heightImg={props.heightImg} />
            <div className="course-overlay"></div>
          </Link>
          <BestsellerBadge bestseller={props.bestseller}>
            BESTSELLER
          </BestsellerBadge>
          <IconPlay className="play">
            <IoPlayOutline />
          </IconPlay>
        </TopSection>
      </div>
      <div className={props.className ? "col-md-8" : ""}>
        <InfoSection>
          <span>{props?.totalView} views</span>
          <span>{props?.createdAt}</span>
        </InfoSection>
        <TitleSection>
          <Link
            to={`${ROUTES.COURSE_DETAIL.replace(":slug", props.slug ?? "")}`}
          >
            <h3>{props?.title}</h3>
          </Link>
          {props?.subCategory?.name ? (
            <p>{props?.subCategory?.name}</p>
          ) : (
            <p>{props?.subCategory}</p>
          )}
        </TitleSection>
        {props.purchased && (
          <PurchasedBadge className="purchased">Purchased</PurchasedBadge>
        )}
        <InstructorSection>
          <div>
            By{" "}
            {props?.instructor?.fullname ? (
              <span className="course__instructor">
                <Link to={`${ROUTES.PROFILE.replace(":slug", props.userId)}`}>
                  {props?.instructor?.fullname}
                </Link>
              </span>
            ) : (
              <span className="course__instructor">
                <Link to={`${ROUTES.PROFILE.replace(":slug", props.userId)}`}>
                  {props?.instructor}
                </Link>
              </span>
            )}
          </div>
          <div>
            {(isBuyCourse === undefined) || (props?.instructor?._id === userId) ? undefined : isBuyCourse ? null : (
              <button
                className="course__icon"
                onClick={(e) => handleDisabled(e)}
                title="Add to cart"
              >
                <AiOutlineShoppingCart />
              </button>
            )}
            <span>{props?.price?.toLocaleString()} đ</span>
          </div>
        </InstructorSection>
      </div>
    </CardContainer>
  );
};

export default CardCourse;
