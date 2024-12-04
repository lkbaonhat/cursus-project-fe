import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Button, CarouselContainer, CarouselTrack } from "./Carousel";
import { useState } from "react";
import CardCourse from "@/components/molecules/Card/CardCourse/CardCourse";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";
import { formatTime } from "@/utils/helpers/date";

export default function NewestCourses({ ...props }) {
  const { courses } = props;
  const { t } = useTranslation("home"); // Using "home" namespace

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const next = () => {
    const nextIndex = activeIndex === courses.length - 3 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const prev = () => {
    const nextIndex = activeIndex === 0 ? courses.length - 3 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const onWidthChange = (width: number) => {
    setCardWidth(width);
  };

  const slides = props.courses.map((item: any, index: number) => {
    return (
      <div className="me-3 mb-4" key={index}>
        <CardCourse
          _id={item._id}
          title={item.title}
          image={item.image}
          rating={item.rating}
          views={item.totalView}
          duration={""}
          price={item.price}
          instructor={item.author[0]}
          subCategory={item.subCategory[0]}
          bestseller={item.isBestseller}
          slug={item.slug}
          totalView={item.totalView}
          role={item.author[0].role}
          userId={item.author[0]._id}
          createdAt={formatTime(item.createdAt)}
          onWidthChange={onWidthChange}
        />
      </div>
    );
  });

  return (
    <>
      <div className="container">
        <CarouselContainer>
          <div className="carousel-title">
            <h4>{t("home.newest_courses")}</h4>
            <Link to={ROUTES.EXPLORE}>{t("home.see_all")}</Link>
          </div>
          <div className="stage-outer">
            <CarouselTrack offset={-activeIndex * (cardWidth + 15)}>
              {slides}
            </CarouselTrack>
          </div>
          <div>
            <Button className="left" onClick={prev} top={51}>
              <GoChevronLeft />
            </Button>
            <Button className="right" onClick={next} top={51}>
              <GoChevronRight />
            </Button>
          </div>
        </CarouselContainer>
      </div>
    </>
  );
}
