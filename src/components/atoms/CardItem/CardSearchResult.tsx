import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { FaEllipsisVertical } from "react-icons/fa6";
import { ReactNode, useState } from "react";

interface CourseCardProps {
  _id: string;
  title: string;
  subCategory: string;
  author: string;
  price: number;
  imageUrl: string;
  slug: string;
  highlightedTitle: string; 
  children?: ReactNode; 
}


const CourseCard = styled.div`
  display: flex;
  background: #fff;
  width: 100%;
  float: left;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #efefef;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(1.5px);
  }

  img {
    width: 240px;
    height: 140px;
    object-fit: cover;
    border-radius: 3px;
    cursor: pointer;
  }

  .course-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-top: 10px;
    line-height: 1.2;
    margin-left: 14px;
  }

  .course-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.2s;
    display: flex;
    align-items: center;
  }

  .dropdown-button {
    background-color: transparent;
    border: none;
    font-size: 20px;
    color: #ccc;
    cursor: pointer;
    &:hover {
      color: #525252;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    border: 1px solid #efefef;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 8px;
    z-index: 10;
  }

  .dropdown-menu p {
    margin: 0;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
    color: #333;

    &:hover {
      background-color: #f1f1f1;
    }
  }

  p {
    font-size: 12px;
    font-family: "Roboto", sans-serif;
    color: #777;
    margin-bottom: 25px;
    cursor: pointer;

    &:hover {
      color: #555;
    }
  }

  .author-price {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .price {
    font-size: 14px;
    font-family: "Roboto", sans-serif;
    font-weight: bold;
  }

  .author {
    cursor: pointer;
  }

  @media (max-width: 991px) {
    flex-direction: column;

    img {
      width: 100%;
    }

    .course-info {
      padding: 5px;
    }

    h3 {
      font-size: 16px;
    }

    p {
      font-size: 14px;
    }

    .price {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    img {
      width: 97%;
      height: auto;
    }
    h3 {
      font-size: 16px;
    }

    p {
      font-size: 14px;
    }

    .price {
      font-size: 14px;
    }
  }
`;
const CardSearchResult = (props: CourseCardProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateCourseDetail = () => {
    navigate(ROUTES.COURSE_DETAIL.replace(":slug", `${props.slug}`));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <CourseCard key={props._id} className="mb-2">
      <img
        src={props.imageUrl}
        alt={`Course: ${props.title}`}
        onClick={handleNavigateCourseDetail}
      />

      <div className="course-info">
        <div className="course-header">
          <h3 onClick={handleNavigateCourseDetail}>
            {props.children} {/* Render highlighted title */}
          </h3>
          <button className="dropdown-button" onClick={toggleDropdown}>
            <FaEllipsisVertical />
          </button>
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <p onClick={handleNavigateCourseDetail}>Save</p>
          </div>
        )}

        <p onClick={handleNavigateCourseDetail}>{props.subCategory}</p>
        <div className="author-price">
          <p className="price">{props.price} đ</p>
        </div>
      </div>
    </CourseCard>
  );
};

export default CardSearchResult;
