import { style } from "@/theme";
import styled from "styled-components";

//done
export const CardContainer = styled.div<MODEL.IStyleProps>`
  width: ${(props) => props.width || "380px"};
  height: ${(props) => props.height || "400px"};
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px;
  font-family: Arial, sans-serif;
`;

//done
export const TopSection = styled.div`
  position: relative;
  width: 100%;
  a {
    .course-overlay {
      position: absolute;
      top: 0;
      padding: 10px;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: linear-gradient(transparent, rgba(51, 51, 51, 0.3) 90%);
    }
  }
  &:hover {
    .play {
      color: ${style.colors.white.bg};
      opacity: 1;
    }
  }
`;

//done
export const CourseImage = styled.img<MODEL.ImageProps>`
  width: 100%;
  height: ${(props) => props.heightImg || "200px"};
  border-radius: 4px;
`;

//done
export const RatingBadge = styled.div<MODEL.CardProps>`
  position: absolute;
  top: 18px;
  left: 10px;
  background-color: #fdcc0d;
  width: 66px;
  height: 25px;
  font-size: 14px;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  display: ${(props) => (props.bestseller ? "flex" : "none")};
  align-items: center;
`;

// done
export const BestsellerBadge = styled.div<MODEL.CardProps>`
  position: absolute;
  top: 20px;
  right: 1px;
  background-color: #fa8305;
  width: 80px;
  height: 17px;
  color: white;
  border-radius: 4px;
  text-align: center;
  padding: 3px 9px;
  font-size: 9px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  display: ${(props) => (props.bestseller ? "flex" : "none")};
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: -6px;
    border-right: 8px solid #fa8305;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
`;

//done
export const DurationLabel = styled.div`
  position: absolute;
  bottom: 17px;
  right: 20px;
  background-color: rgba(51, 51, 51, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
`;

// Middle section with views, time
export const InfoSection = styled.div`
  padding: 10px;
  color: gray;
  font-size: 0.9em;
  display: flex;
  justify-content: flex-start;
  span:nth-child(1)::after {
    content: "•";
    margin: 0 4px;
  }
`;

// Course title and description
export const TitleSection = styled.div`
  padding: 0 10px;
  a {
    text-decoration: none;
    h3 {
      font-size: 1.2em;
      font-weight: bold;
      margin: 5px 0;
      color: #333;
      &:hover {
        cursor: pointer;
      }
    }
  }
  p {
    margin: 0;
    padding-top: 8px;
    color: gray;
    font-size: 0.9em;
  }
`;

// Instructor and price section
export const InstructorSection = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  height: 50px;
  span {
    font-weight: bold;
    &:hover {
      cursor: default;
    }
  }
  .course__instructor {
    color: #333;
    a{
      color: ${style.colors.black.title};
    }
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .course__icon {
    background-color: #fff;
    padding-bottom: 10px;
    width: 45px;
    border: none;
    &:focus,
    &:focus-within {
      border: none;
    }
    &:hover {
      color: #ed2a26;
    }
  }
`;

export const IconPlay = styled.span`
  border: 0;
  width: 50px;
  height: 50px;
  float: left;
  text-align: center;
  border-radius: 100%;
  padding: 13px 17px;
  font-size: 20px;
  color: #fff;
  position: absolute;
  top: 40%;
  right: 40%;
  opacity: 0;
  background: rgba(51, 51, 51, 0.8);
  transition: all 0.2s ease-in-out;
  svg {
    vertical-align: baseline;
  }
`;

export const PurchasedBadge = styled.div`
  font-size: ${style.fonts.size.small};
  font-weight: ${style.fonts.weight.bold};
  color: ${style.colors.white.bg};
  background: ${style.colors.black.title};
  margin-left: 10px;
  display: inline-block;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 3px;
  margin-top: 15px;
  cursor: default;
`;
