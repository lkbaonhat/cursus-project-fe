import styled from "styled-components";

interface CarouselTrackProps {
  offset: number;
}

interface CarouselProps {
  height?: number;
  width?: number;
  top?: number;
}

//done
export const CarouselContainer = styled.div`
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
export const CarouselTrack = styled.div<CarouselTrackProps>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.offset}px);
  position: relative;
`;

export const Button = styled.button<CarouselProps>`
  position: absolute;
  top: ${(props) => props.top || 45}%;
  background-color: #fff;
  color: #333;
  font-size: 1.2em;
  border: 1px solid #e5e5e5;
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
    left: -15px;
  }

  &.right {
    right: -8px;
  }
`;
