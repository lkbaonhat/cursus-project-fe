import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useState, useEffect } from "react";
import { Button, CarouselContainer, CarouselTrack } from "./CarouselDashboard";
import CardNews from "@/containers/InstructorDashboard/Components/CardNews";
import { news } from "./data";

export default function CarouselNews() {
  //   const { news } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(360);

  const next = () => {
    const nextIndex = activeIndex === news.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const prev = () => {
    const prevIndex = activeIndex === 0 ? news.length - 1 : activeIndex - 1;
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
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = news.map((item: any, index: number) => {
    return (
      <div className="me-3 mb-4" key={index}>
        <CardNews
          image={item.image}
          title={item.title}
          description={item.description}
        />
      </div>
    );
  });

  return (
    <CarouselContainer width={cardWidth}>
      <div className="container">
        <div className="carousel-title">
          <h4 className="carousel-title-text">News</h4>
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
