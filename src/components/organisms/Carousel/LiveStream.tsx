import { useState } from "react";
import styled from "styled-components";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { person } from "./data";
import CardLiveStream from "@/components/molecules/Card/CardLiveStream";
import { useTranslation } from 'react-i18next'; 

interface CarouselTrackProps {
  offset: number;
}

interface ButtonPosition {
  top?: number;
}

//done
const CarouselContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 0;
  .stage-outer {
    position: relative;
    overflow: hidden;
  }
  .carousel-title {
    display: flex;
    justify-content: space-between;
    h4 {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    a {
      padding-top: 3px;
      margin-bottom: 20px;
      color: #afafaf;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      &:hover {
        color: #333;
      }
    }
  }
`;

//fix
const CarouselTrack = styled.div<CarouselTrackProps>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.offset}px);
  position: relative;
`;

const Button = styled.button<ButtonPosition>`
  position: absolute;
  top: ${(props) => props.top || 48}%;
  background-color: #fff;
  color: #333;
  font-size: 1.2em;
  border: none;
  border-radius: 3px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.07);
  padding: 0px 6px 2px 6px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  &:hover {
    background-color: #ed2a26;
    color: #fff;
  }

  &.left {
    left: 5px;
  }

  &.right {
    right: 5px;
  }
`;

export default function LiveStream() {
  const { t } = useTranslation('home'); // Using "home" namespace

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const next = () => {
    const nextIndex = activeIndex === person.length - 6 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const prev = () => {
    const nextIndex = activeIndex === 0 ? person.length - 6 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const onWidthChange = (width: number) => {
    setCardWidth(width);
  };

  const slides = person.map((item, index) => {
    return (
      <div className="me-3 mb-4" key={index}>
        <CardLiveStream width={"184px"} onWidthChange={onWidthChange} />
      </div>
    );
  });
  return (
    <div className="container">
      <CarouselContainer>
        <div className="carousel-title">
          <h4>{t('home.live_streams')}</h4>
          <a href="">{t('home.see_all')}</a>
        </div>
        <div className="stage-outer">
          <CarouselTrack offset={-activeIndex * (cardWidth + 15)}>
            {slides}
          </CarouselTrack>
        </div>
        <div>
          <Button className="left" onClick={prev}>
            <GoChevronLeft />
          </Button>
          <Button className="right" onClick={next}>
            <GoChevronRight />
          </Button>
        </div>
      </CarouselContainer>
    </div>
  );
}