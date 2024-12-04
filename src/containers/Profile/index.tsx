import { useEffect, useState } from "react";
import styled from "styled-components";
import { style } from "@/theme/index";
import { Button } from "@/components/atoms/Button/Button";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { IconButton } from "@/containers/Profile/components/IconButton";
import TabsItem from "./components/Tabs/TabsItem";
import About from "./components/About";
import TabItemContent from "./components/Tabs/TabItemContent";
import Course from "./components/Course";
import ListComponent from "./components/ListComponent/ListComponent";
import Purchased from "./components/Purchased";
import Discussion from "./components/Discussion";
import { decodeJWT, useVerifyUser } from "@/utils/hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { selectCourseOfInstructor, selectCourseOfPurchase, selectIntructerProfile, selectStateUserInfo } from "@/modules/global/selector";
import { ROUTES, STUDENT } from "@/routes";
import { toast } from "react-toastify";
import { cursusAPI } from "@/services";
import { CookiesService } from "@/services/cookies.service";
import ModalSocial from "@/containers/Profile/components/Modal/ModalSocial";


export const Container = styled.div`
  background-color: ${style.colors.black.title};
  width: 100%;
  padding: 26px;
  a {
    color: ${style.colors.white.text};
    text-decoration: none;
    font-size: 14px;
  }
`;

export const IndividualInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .profile-info {
    color: ${style.colors.white.text};
    margin-left: 20px;
    p {
      font-size: 14px;
    }
  }
`;

export const AnotherData = styled.ul`
  margin-top: 10px;
  border: 1px solid #4f4848;
  display: flex;
  color: ${style.colors.white.text};
  text-align: center;
  padding-left: 0;
  font-size: 14px;
  li {
    display: inline-block;
    width: 25%;
    padding: 15px 10px;
    border-right: 1px solid #4f4848;
    div:first-child {
      margin-bottom: 10px;
    }
  }
`;

export const Contact = styled.div`
  text-align: right;
`;

export const NavContainer = styled.div`
  background-color: ${style.colors.white.bg};
  padding: 20px 30px 0 30px;
`;

export const UnderProfile = styled.div`
  background-color: #fff;
  height: 200px;
  width: 100%;
`;

const tabItem = [
  { index: 0, name: "About", component: About },
  { index: 1, name: "Course", component: Course },
  { index: 2, name: "Purchased", component: Purchased },
  { index: 3, name: "Discussion", component: Discussion },
];

export const ContentContainer = styled.div`
  padding: 20px 30px;
`;

export default function Profile() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeTabs = (index: number) => {
    setActiveTab(index);
  };

  const handleSocialClick = () => {
    setIsOpen(true);
  };

  useVerifyUser();

  const user = useSelector((selectStateUserInfo));
  /**
   * Get User
   */
  useEffect(() => {
    dispatch({ type: "getUserById", payload: slug });
  }, [slug])
  //----------------End------------------//
  /**
   * Get course of instructor
   */
  const listCourses = useSelector(selectCourseOfInstructor);
  useEffect(() => {
    dispatch({ type: "getCourseOfInstructor", payload: slug });
  }, [slug]);
  //----------------End------------------//

  /**
 * Get course Purchased
 */
  useEffect(() => {
    dispatch({ type: "getCourseOfPurchase", payload: slug });
  }, [slug]);
  //----------------End------------------//


  /**
   * Decode JWT
   */
  const decodedToken = decodeJWT();
  const role = user ? user?.role : "";
  //----------------End------------------//


  /**
   * Scroll to top
   */
  window.scrollTo(0, 0);
  //----------------End------------------//


  /**
   * Handle Subscribe
   * @returns 
   */
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const token = CookiesService.get();
  const handleSubscribe = async () => {
    try {
      if (!token) {
        toast.error("Please login to subscribe the instructor");
        navigate(`${ROUTES.LOGIN}`);
        return;
      }
      const res = await cursusAPI.userService.subscribe({
        userId: decodedToken?.sub,
        instructorId: user?._id,
      });
      toast.success(res.data.data.message);
      dispatch({ type: "setSubscribeChannels", payload: decodedToken?.sub });
      setIsSubscribed(true);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const handleUnSubscribe = async () => {
    try {
      const res = await cursusAPI.userService.unsubscribe({
        userId: decodedToken?.sub,
        instructorId: user?._id,
      });
      toast.success(res.data.data.message);
      setIsSubscribed(false);
      dispatch({ type: "setSubscribeChannels", payload: decodedToken?.sub });
    } catch (err) {
      console.error("Error unsubscribing:", err);
    }
  };


  const checkIsSubscribed = async (): Promise<boolean | null> => {
    try {
      const response = await cursusAPI.userService.isInstructorSubscribed({
        userId: decodedToken?.sub,
        instructorId: user?._id,
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
  //----------------End------------------//

  return (
    <div className="container-fluid p-0">
      <div className="">
        <Container>
          <div className="row">
            <div className="col-lg-6">
              <IndividualInfo>
                <Avatar src={user?.image || style.images.avatar.profile} />
                <div className="profile-info">
                  <h4>{user?.fullname}</h4>
                  <p className="text-capitalize">{user?.role}</p>
                </div>
              </IndividualInfo>
              <AnotherData>
                <li>
                  <div>Enroll Students</div>
                  <div>612K</div>
                </li>
                <li>
                  <div>Courses</div>
                  <div>{listCourses.length}</div>
                </li>
                <li>
                  <div>Reviews</div>
                  <div>11K</div>
                </li>
                <li>
                  <div>Subscriptions</div>
                  <div>452K</div>
                </li>
              </AnotherData>
            </div>
            <div className="col-lg-6 ">
              {decodedToken?.sub === user?._id ? (
                <Link
                  to={`/${role}/${STUDENT.SETTINGS}`}
                  className="d-flex justify-content-end align-items-center my-3"
                >
                  <CiSettings
                    color={style.colors.white.text}
                    fontSize={"16px"}
                    className="me-2"
                  />
                  Setting
                </Link>
              ) : (
                <p></p>
              )}
              <Contact>
                <Link to={user?.facebook || "#"} onClick={handleSocialClick}>
                  <IconButton
                    backgroundColor={style.colors.blue.bg_logo_fb}
                    padding="10px 0"
                    borderRadius="3px"
                    height="36px"
                    width="36px"
                    margin="10px"
                  >
                    <FaFacebookF />
                  </IconButton>
                </Link>

                <Link to={user?.twitter || '#'} onClick={handleSocialClick}>
                  <IconButton
                    backgroundColor={style.colors.blue.bg_logo_twitter}
                    padding="10px 0"
                    borderRadius="3px"
                    height="36px"
                    width="36px"
                    margin="10px"
                  >
                    <FaTwitter />
                  </IconButton>
                </Link>

                <Link to={user?.linkedin || '#'} onClick={handleSocialClick}>
                  <IconButton
                    backgroundColor={style.colors.purple.bg_logo_linked}
                    padding="10px 0"
                    borderRadius="3px"
                    height="36px"
                    width="36px"
                    margin="10px"
                  >
                    <FaLinkedinIn />
                  </IconButton>
                </Link>

                <Link to={user?.youtube || '#'} onClick={handleSocialClick}>
                  <IconButton
                    backgroundColor={style.colors.red.bg}
                    padding="10px 0"
                    borderRadius="3px"
                    height="36px"
                    width="36px"
                  >
                    <FaYoutube />
                  </IconButton>
                </Link>
              </Contact>
              <div className="text-end mt-4">

                <div className='user-name'>
                  {isSubscribed ? (
                    <Button
                      width="auto"
                      height="40px"
                      backgroundColor={style.colors.transparent.bg}
                      border_radius="3px"
                      border={`1px solid ${style.colors.white.text}`}
                      color={style.colors.white.bg}
                      fontSize="14px"
                      padding="0 30px"
                      margin="0"
                      className="me-2"
                      hover={true}
                      onClick={handleUnSubscribe}
                    >
                      UnSubscribe
                    </Button>
                  ) : (
                    <Button
                      width="auto"
                      height="40px"
                      backgroundColor={style.colors.red.bg}
                      border_radius="3px"
                      color={style.colors.white.text}
                      fontSize="14px"
                      padding="0 30px"
                      margin="0"
                      className="me-2"
                      onClick={handleSubscribe}
                    >
                      Subscribe
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="">
        <NavContainer>

          <ListComponent
            data={tabItem}
            renderItem={(item) => {
              if (decodedToken?.sub === user?._id) {
                // Hiển thị tất cả các item
                return (
                  <TabsItem
                    name={item.name}
                    key={item.index}
                    index={item.index}
                    active={activeTab}
                    onChangeTabs={handleChangeTabs}
                  />
                );
              } else {
                // Hiển thị tất cả các item trừ item.name === "Purchased"
                return item.name !== "Purchased" ? (
                  <TabsItem
                    name={item.name}
                    key={item.index}
                    index={item.index}
                    active={activeTab}
                    onChangeTabs={handleChangeTabs}
                  />
                ) : null;
              }
            }}
          />


        </NavContainer>

        <ModalSocial show={isOpen} onHide={() => setIsOpen(false)} />

        <ContentContainer>
          {tabItem.map(
            (item) =>
              activeTab === item.index && (
                <TabItemContent Component={item.component} key={item.index} />
              )
          )}
        </ContentContainer>
      </div>
    </div>
  );
}
