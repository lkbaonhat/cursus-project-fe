import { useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { LuShare2 } from "react-icons/lu";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { cursusAPI } from "@/services";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { decodeJWT } from "@/utils/hooks/useUser";
import { CookiesService } from "@/services/cookies.service";
import { toast } from "react-toastify";
import { ROUTES } from "@/routes";
import './index.scss'

const Channel = ({ ...props }: any) => {
  const [likes, setLikes] = useState<number>(props.likes);
  const [dislikes, setDislikes] = useState<number>(props.dislikes)
  //manage share modal visibility
  const [showShareModal, setShowShareModal] = useState(false);

  // State to track whether user has liked or disliked
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | "none">("none");

  const user = decodeJWT();
  const token = CookiesService.get();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

  const validateCourseReaction = async () => {
    try {
      const res = await cursusAPI.courseService.validateCourseReaction({
        courseId: props.courseId,
        userId: user?.sub,
      });
      return res.data.data;
    } catch (err: any) {
      console.error("Error validating:", err);
    }
  };

  useEffect(() => {
    if (!token) {
      setUserReaction("none");
    } else {
      const fetchReactionStatus = async () => {
        const response = await validateCourseReaction();
        setUserReaction(response.status)
      };
      fetchReactionStatus();
    }
  }, [validateCourseReaction]);



  //--------------------Likes / Dislikes--------------------//

  const handleLike = async () => {
    try {
      if (!token) {
        toast.error("Please login to like the instructor");
        navigate(`${ROUTES.LOGIN}`);
        return;
      }
      const res = await cursusAPI.courseService.likeCourse({
        courseId: props.courseId,
        userId: user?.sub,
      });
      if (userReaction === "like") {
        setUserReaction("none");
        setLikes((prev) => prev - 1);
      } else if (userReaction === "dislike") {
        setUserReaction("like");
        setLikes((prev) => prev + 1);
        setDislikes((prev) => prev - 1);
      } else {
        setUserReaction("like");
        setLikes((prev) => prev + 1);
      }
      toast.success(res.data.data.message);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };


  // Handler for dislike button
  const handleDislike = async () => {
    try {
      if (!token) {
        toast.error("Please login to dislike the instructor");
        navigate(`${ROUTES.LOGIN}`);
        return;
      }
      const res = await cursusAPI.courseService.dislikeCourse({
        courseId: props.courseId,
        userId: user?.sub,
      });
      if (userReaction === "dislike") {
        setUserReaction("none");
        setDislikes((prev) => prev - 1);
      } else if (userReaction === "like") {
        setUserReaction("dislike");
        setLikes((prev) => prev - 1);
        setDislikes((prev) => prev + 1);
      } else {
        setUserReaction("dislike");
        setDislikes((prev) => prev + 1);
      }
      toast.success(res.data.data.message);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };



  const handleShare = () => {
    setShowShareModal(true); // Show the share modal
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);

    alert('Link copied to clipboard!');
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  useEffect(() => {
    if (props?.likes !== undefined) {
      setLikes(props.likes);
    }
    if (props?.dislikes !== undefined) {
      setDislikes(props.dislikes);
    }
  }, [props.likes, props.dislikes]);

  //--------------------End--------------------//


  //--------------------Subscibe / Unsubscibe--------------------//

  const handleSubscribe = async () => {
    try {
      if (!token) {
        toast.error("Please login to subscribe the instructor");
        navigate(`${ROUTES.LOGIN}`);
        return;
      }
      const res = await cursusAPI.userService.subscribe({
        userId: user?.sub,
        instructorId: props.author?._id,
      });
      toast.success(res.data.data.message);
      dispatch({ type: "setSubscribeChannels", payload: user?.sub });
      setIsSubscribed(true);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const handleUnSubscribe = async () => {
    try {
      const res = await cursusAPI.userService.unsubscribe({
        userId: user?.sub,
        instructorId: props.author?._id,
      });
      toast.success(res.data.data.message);
      setIsSubscribed(false);
      dispatch({ type: "setSubscribeChannels", payload: user?.sub });
    } catch (err) {
      console.error("Error unsubscribing:", err);
    }
  };

  const checkIsSubscribed = async (): Promise<boolean | null> => {
    try {
      const response = await cursusAPI.userService.isInstructorSubscribed({
        userId: user?.sub,
        instructorId: props.author?._id,
      });
      return response.data.data;
    } catch (err) {
      console.error("Error unsubscribing:", err);
    }
    return true;
  };

  useEffect(() => {
    if (!token) {
      setIsSubscribed(false);
    } else {
      const fetchSubscriptionStatus = async () => {
        const response = await checkIsSubscribed();
        setIsSubscribed(response);
      };
      fetchSubscriptionStatus();
    }
  }, [checkIsSubscribed]);

  //--------------------End--------------------//

  return (
    <>
      <div className='user'>
        <div className='user-left'>
          <div className='live-user'>
            <div className='user-img'>
              <Link to={`${ROUTES.PROFILE.replace(":slug", props.author?._id)}`}>
                <img src={props.author?.image || "https://gambolthemes.net/html-items/cursus-new-demo/images/left-imgs/img-1.jpg"} alt="User" />
              </Link>

            </div>
            <div className='user-name'>
              <Link to={`${ROUTES.PROFILE.replace(":slug", props.author?._id)}`}>
                <div className='user-name-detail'>{props.author?.fullname}</div>
              </Link>
              {isSubscribed ? (
                <button
                  className='btn-unsubscribe'
                  onClick={handleUnSubscribe}
                >
                  UnSubscribe
                </button>
              ) : (
                <button
                  className='btn-subscribe'
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </div>
        <div className='user-right'>
          <ul className='box-tools'>
            <li>
              <span className="view">
                <IoEyeOutline />
                <span>{props.view + 1}</span>
              </span>
            </li>
            <li>
              <a onClick={handleLike} className={userReaction === "like" ? 'active' : ''} >
                <BiLike />
                <span>{likes}</span>
              </a>
            </li>
            <li>
              <a onClick={handleDislike} className={userReaction === "dislike" ? 'active' : ''}>
                <BiDislike />
                <span>{dislikes}</span>
              </a>
            </li>
            <li>
              <a onClick={handleShare}>
                <LuShare2 className="icon-share-channel" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Share Modal */}
      {showShareModal && (
        <div className="share-modal">
          <div className="modal-content">
            <h4>Share this course</h4>
            <div className="share-options">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="icon" />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="icon" />
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="icon" />
              </a>
              <button onClick={handleCopyLink}>
                <LuShare2 className="icon" />
              </button>
            </div>
            <button onClick={closeShareModal}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Channel
