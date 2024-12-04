import CardContact from "@/components/molecules/Card/CardContact";
import { useState } from "react";
import { courses } from "./data";
import { Button, CarouselContainer, CarouselTrack } from "./Carousel";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { selectStatePopularInstructors } from "@/modules/global/selector";

export default function PopularInstructors() {
  const { t } = useTranslation('home'); // Using "home" namespace

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

  /**
    * Get all popular instructors
    */
  const popularInstructors = useSelector(selectStatePopularInstructors);
  //--------------------End--------------------//

  const slides = popularInstructors.map((item, index) => { // Added index to map
    return (
      <div className="me-3 mb-4" key={index}>
        <CardContact width={"380px"} onWidthChange={onWidthChange} item={item} />
      </div>
    );
  });


  return (
    <>
      <div className="container">
        <CarouselContainer>
          <div className="carousel-title">
            <h4>{t('home.popular_instructors')}</h4>
            <a href="">{t('home.see_all')}</a>
          </div>
          <div className="stage-outer">
            <CarouselTrack offset={-activeIndex * (cardWidth + 15)}>
              {slides}
            </CarouselTrack>
          </div>
          <div>
            <Button className="left" onClick={prev} top={48}>
              <GoChevronLeft />
            </Button>
            <Button className="right" onClick={next} top={48}>
              <GoChevronRight />
            </Button>
          </div>
        </CarouselContainer>
      </div>
    </>
  );
}