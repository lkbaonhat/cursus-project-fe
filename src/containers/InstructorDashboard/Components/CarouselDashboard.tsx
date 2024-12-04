import styled from "styled-components";

interface CarouselTrackProps {
  offset: number;
}

interface CarouselProps {
  height?: number;
  width?: number;
  top?: number;
}

export const CarouselContainer = styled.div<MODEL.IStyleProps>`
  width: 100%;
  position: relative;
  z-index: 0;
  background-color: #f8f8f8;
  padding: 20px 0;
  width: 100%;
  will-change: transform;
  margin: 0;

  .container {
    width: ${(props) => props.width}px;
    padding: 0;
    margin: 0;
  }

  .stage-outer {
    position: relative;
    overflow: hidden;
    padding-bottom: 20px;
  }

  .carousel-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
    width: 100%;

    .carousel-title-text {
      font-size: 18px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 12px;
    }

    .carousel-title-button {
      display: flex;
      gap: 5px;
      margin-right: 12px;
    }
  }
`;

// Track cho các phần tử bên trong carousel
export const CarouselTrack = styled.div<CarouselTrackProps>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.offset}px);
`;

// Button điều hướng
export const Button = styled.button<CarouselProps>`
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
