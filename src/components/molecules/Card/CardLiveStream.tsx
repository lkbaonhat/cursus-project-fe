import { Avatar } from "@/components/atoms/Avatar/Avatar";
import React from "react";
import styled from "styled-components";

interface CardLiveStreamProps {
  height?: number;
  width?: number;
  name?: string;
}

const CardLiveStreamContainer = styled.div<MODEL.IStyleProps>`
  background-color: rgba(51, 1, 51, 0.1);
  width: ${(props) => props.width || "174px"};
  height: 173px;
  padding: 15px;
`;

const CardLiveStreamContent = styled.a`
  text-align: center;
  display: inline-block;
  width: 100%;
  padding: 15px 10px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(30px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.13);
  text-decoration: none;
  h4 {
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: 550;
    font-family: "Roboto", sans-serif;
    text-align: center;
    color: #333;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: #686f7a;
    display: inline-block;
    text-align: center;
    position: relative;
    margin: 0;
    font-size: 14px;
    span {
      width: 6px;
      height: 6px;
      background: #ed2a26;
      position: absolute;
      border-radius: 100%;
      top: 2px;
      right: -9px;
    }
  }
`;

export default function CardLiveStream(props: MODEL.IStyleProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      const width = ref.current.offsetWidth;
      props.onWidthChange?.(width);
    }
  }, [props.width]);
  
  return (
    <CardLiveStreamContainer width={props.width} ref={ref}>
      <CardLiveStreamContent>
        <Avatar
          src={
            "https://gambolthemes.net/html-items/cursus-new-demo/images/left-imgs/img-1.jpg"
          }
          width={60}
          height={60}
        />
        <h4>John Doe</h4>
        <p>
          live
          <span></span>
        </p>
      </CardLiveStreamContent>
    </CardLiveStreamContainer>
  );
}
