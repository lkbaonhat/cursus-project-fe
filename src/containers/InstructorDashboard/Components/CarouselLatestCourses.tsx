import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useState, useEffect } from "react";
import LatestCourses from "@/containers/InstructorDashboard/Components/LatestCourses";
import { Button, CarouselContainer, CarouselTrack } from "./CarouselDashboard";
import { courses } from "./data";

export default function CarouselLatestCourses() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(360); // Chiều rộng mặc định của card

  const next = () => {
    const nextIndex = activeIndex === courses.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const prev = () => {
    const prevIndex = activeIndex === 0 ? courses.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      const cardElement = document.querySelector(".course-card");
      if (cardElement) {
        setCardWidth(cardElement.clientWidth - 24);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Gọi khi component load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = courses.map((item: any, index: number) => {
    return (
      <div className="me-3 mb-4" key={index}>
        <LatestCourses
          image={item.image}
          time={item.time}
          title={item.title}
          view={item.view}
          purchased={item.purchased}
          totalLike={item.totalLike}
        />
      </div>
    );
  });

  return (
    <CarouselContainer width={cardWidth}>
      <div className="container">
        <div className="carousel-title">
          <h4 className="carousel-title-text">Latest Courses performance</h4>
          <div className="carousel-title-button">
            <Button className="left" onClick={prev}>
              <GoChevronLeft />
            </Button>
            <Button className="right" onClick={next}>
              <GoChevronRight />
            </Button>
          </div>
        </div>

        <div className="stage-outer">
          <CarouselTrack offset={-activeIndex * cardWidth}>
            {slides}
          </CarouselTrack>
        </div>
      </div>
    </CarouselContainer>
  );
}
