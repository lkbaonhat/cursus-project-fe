import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Button } from "@/containers/Feedback/components/Button";
import { INSTRUCTOR } from "@/routes";
import { LuBellRing } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./InstructorNotificattion.scss";

function InstructorNotification() {
  const navigate = useNavigate();

  return (
    <div className="instructor-notification">
      <h2 className="title-notification">
        <i>
          <LuBellRing className="icon-bell" />
        </i>
        Notifications
      </h2>

      <Button
        width="162px"
        height="40px"
        border_radius="3px"
        margin="40px 0 0 0"
        onClick={() =>
          navigate(INSTRUCTOR.NOTIFICATION.replace("notification", "/instructor/settings"))
        }
      >
        Notification Setting
      </Button>

      <div className="notificate-content">
        <div className="notificate-item">
          <div>
            <Avatar
              src="https://gambolthemes.net/html-items/cursus-new-demo/images/left-imgs/img-1.jpg"
              width="40px"
              height="40px"
              margin="0 10px 0 0"
            />
          </div>
          <div className="notificate-item-text">
            <h6>Rock William</h6>
            <p>
              Like Your Comment On Video{" "}
              <strong>How to create sidebar menu</strong>.
            </p>
            <span className="time">2 min ago</span>
          </div>
        </div>

        <div className="notificate-item">
          <div>
            <Avatar
              src="https://gambolthemes.net/html-items/cursus-new-demo/images/left-imgs/img-2.jpg"
              width="40px"
              height="40px"
              margin="0 10px 0 0"
            />
          </div>
          <div className="notificate-item-text">
            <h6>Jassisca Smith</h6>
            <p>
              Added New Review In Video{" "}
              <strong>Full Stack PHP Developer</strong>.
            </p>
            <span className="time">12 min ago</span>
          </div>
        </div>

        <div className="notificate-item">
          <div>
            <Avatar
              src="https://gambolthemes.net/html-items/cursus-new-demo/images/left-imgs/img-9.jpg"
              width="40px"
              height="40px"
              margin="0 10px 0 0"
            />
          </div>
          <div className="notificate-item-text">
            <p>Your Membership Activated.</p>
            <span className="time">20 min ago</span>
          </div>
        </div>

        <div className="notificate-item">
          <div>
            <Avatar
              src="https://gambolthemes.net/html-items/cursus-new-demo/images/left-imgs/img-9.jpg"
              width="40px"
              height="40px"
              margin="0 10px 0 0"
            />
          </div>
          <div className="notificate-item-text">
            <p>
              Your Course Approved Now.{" "}
              <strong>How to create sidebar menu</strong>
            </p>
            <span className="time">20 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorNotification;
