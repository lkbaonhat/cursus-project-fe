import { useState } from "react";
import { courses } from "./data";
import { Button, CarouselContainer, CarouselTrack } from "./Carousel";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import CardFeedback from "@/components/molecules/Card/CardFeedback";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { selectStateLimitReviews } from "@/modules/global/selector";

const CardFeedbackContainer = styled.div`
  position: relative;
  overflow: hidden;
  .stage {
    transform: translate3d(15px, 0px, 0px);
    transition: all;
    width: 1580px;
  }
`;

export default function Feedback() {
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
   * Get limit reviews
   */
  const limitReviews = useSelector(selectStateLimitReviews);
  //--------------------End--------------------//


  const slides = limitReviews.map((item, index) => { // Added index to map
    return (
      <div className="me-3 mb-4" key={index}>
        <CardFeedback width={"514px"} onWidthChange={onWidthChange} item={item} />
      </div>
    );
  });

  return (
    <CardFeedbackContainer>
      <div className="stage">
        <CarouselContainer>
          <div className="carousel-title">
            <h4>{t('home.what_our_students_say')}</h4>
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
            <Button className="right" onClick={next} top={50}>
              <GoChevronRight />
            </Button>
          </div>
        </CarouselContainer>
      </div>
    </CardFeedbackContainer>
  );
}