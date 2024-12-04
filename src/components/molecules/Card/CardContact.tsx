import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import React from "react";
import { https } from "@/services/config";

export const CardContainer = styled.div<MODEL.IStyleProps>`
  background: #fff;
  width: ${(props) => props.width || "500px"};
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  min-height: 250px;
`;

export const CardHeader = styled.div`
  text-align: center;
  padding: 20px;
`;

export const CardBody = styled.div`
  text-align: center;
  a {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    text-align: center;
    text-decoration: none;
    margin-right: 5px;
  }
  p {
    margin-top: 10px;
    margin-bottom: 17px;
    color: #686f7a;
    font-size: 13px;
    font-weight: 400;
  }
  div {
  }
`;

export const CardAction = styled.div`
  a {
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
    margin-bottom: 0;
    font-size: 14px;
    width: 35px;
    height: 36px;
    border-radius: 3px;
    text-align: center;
    padding: 9px 0;
    color: #fff;
    transition: all 0.3s ease-in-out;
    svg {
      vertical-align: baseline;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
  .fb {
    background-color: #3b5998;
  }
  .twitter {
    background-color: #1da1f2;
  }
  .linkedin {
    background-color: #8d6cab;
  }
  .youtube {
    background-color: #ff0000;
  }
`;

export const CardFooter = styled.div`
  font-size: 12px;
  margin-top: 20px;
  font-weight: 400;
  color: #686f7a;
  text-align: center;
  span:nth-child(1)::after {
    content: "•";
    margin: 0 4px;
  }
`;

interface ICardContactProps {
  item: any;
  onWidthChange?: (width: number) => void;
}

export default function CardContact(
  props: MODEL.IStyleProps & ICardContactProps
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [cate, setCate] = React.useState([]);
  const fetchCate = async (cateId: any) => {
    try {
      const response = await https.get(`/sub-category/id=${cateId}`);
      const data = await response.data.data;
      setCate(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (props.item.categoryId) {
      fetchCate(props.item.categoryId);
    }
    if (ref.current) {
      const width = ref.current.offsetWidth;
      props.onWidthChange?.(width);
    }
  }, [props.width, props.item]);

  return (
    <CardContainer width={props.width} ref={ref}>
      <CardHeader>
        <Avatar
          src={
            props.item?.image ||
            "https://gambolthemes.net/html-items/cursus-new-demo/images/left-imgs/img-1.jpg"
          }
        />
      </CardHeader>
      <CardBody>
        <Link to={`/profile/${props.item._id}`}>{props.item?.fullname}</Link>
        <FaRegCircleCheck color="#1da1f2" />
        <p>{cate?.name}</p>
        <CardAction>
          <Link to={`${props.item.facebook}`} className="fb">
            <FaFacebookF />
          </Link>
          <Link to={`${props.item.twitter}`} className="twitter">
            <FaTwitter />
          </Link>
          <Link to={`${props.item.linkedin}`} className="linkedin">
            <FaLinkedinIn />
          </Link>
          <Link to={`${props.item.youtube}`} className="youtube">
            <FaYoutube />
          </Link>
        </CardAction>
      </CardBody>
      <CardFooter>{props.item?.email}</CardFooter>
    </CardContainer>
  );
}
