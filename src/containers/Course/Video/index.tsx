import React from "react";
import "./index.scss";
import VideoPlayer from "./components";

interface CourseVideoProps {
  title: string;
  description: string;
  videoId: string;
}

const CourseVideo: React.FC<CourseVideoProps> = (props: CourseVideoProps) => {
  return (
    <div className="leanrning-video-container container">
      <div className="header">
        <VideoPlayer videoId={props?.videoId} />
      </div>
      <div className="content">
        <h1 className="title">{props?.title}</h1>
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: props?.description }}
        />
        <p className="script">
          Tham gia các cộng đồng để cùng học hỏi, chia sẻ và “thám thính” xem có
          gì mới nhé!
        </p>
        <ul className="links">
          <li>
            {" "}
            Fanpage:{" "}
            <a
              href="https://www.facebook.com/phuochuynh63/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.facebook.com/phuochuynh63/
            </a>
          </li>
          <li>
            {" "}
            Group:{" "}
            <a
              href="https://www.facebook.com/phuochuynh63/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.facebook.com/phuochuynh63/
            </a>
          </li>
          <li>
            {" "}
            Youtube:{" "}
            <a
              href="https://www.youtube.com/@phuochuynh7404"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.youtube.com/@phuochuynh7404/featured
            </a>
          </li>
          <li>
            {" "}
            Phước Huỳnh:{" "}
            <a
              href="https://www.facebook.com/phuochuynh63/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.facebook.com/phuochuynh63/
            </a>
          </li>
        </ul>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default CourseVideo;
