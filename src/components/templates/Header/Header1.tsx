import { Button } from '@/components/atoms/Button/Button';
import { Logo } from '@/components/atoms/Logo/Logo';
import SearchComponent from '@/components/organisms/TextField/Search';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '@/components/templates/Header/header1.scss';
import NotiCount, {
  NotiCountContainer,
} from '@/components/atoms/NotiCount/NotiCount';
import { IoIosMenu } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { toogleSidebar } from '@/modules/global/slice';
import DropdownHeader from './components';
import { decodeJWT } from '@/utils/hooks/useUser';
import { useTranslation } from 'react-i18next';
import { INSTRUCTOR, ROLE, STUDENT } from '@/routes';
import { useEffect } from 'react';
import { selectIntructerProfile, selectStateCartLength } from '@/modules/global/selector';

export default function Header1() {
  const { t } = useTranslation(['header']);

  const handleToggleSidebar = () => {
    dispatch(toogleSidebar());
  };

  /**
   * Get user information from JWT
   */
  const userJWT = decodeJWT();
  useEffect(() => {
    dispatch({ type: "getProfile", payload: userJWT?.sub });
  }, [userJWT?.sub]);
  const user = useSelector(selectIntructerProfile);

  //--------------------End--------------------//

  /**
   * Get cart length
   */
  const cartLength = useSelector(selectStateCartLength);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'getLengthCart' });
  }, [cartLength]);
  //--------------------End--------------------//


  /**
   * Check role student and instructor
   */
  const userProfile = user?.role === 'student' || user?.role === 'instructor';
  //--------------------End--------------------//

  return (
    <div className='header-1 d-flex justify-content-center align-items-center'>
      <Button
        height='100%'
        width='68px'
        margin='0'
        border_radius='0'
        onClick={handleToggleSidebar}
      >
        <IoIosMenu className='menu' />
      </Button>

      <div className='main_logo'>
        <Link to={'/'}>
          <img src="https://res.cloudinary.com/dwyzqcunj/image/upload/v1732606123/image-removebg-preview_b1f1rn.png" alt="" className='christmas_hat' />
          <Logo src='https://gambolthemes.net/html-items/cursus-new-demo/images/logo.svg' />

        </Link>
      </div>

      <div className="noel">
        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioAe-jKUycnjz92I1yV1gDOV7cW8yAfuJaP3yGW3PJP4tE0_ApAlzavv3TTVgrRgMSLY9u6X8W8lnxDWvav4_h6Bja3NxP7q2wC_QHdcqHSFrSEwI4xeVB0WShYD4HkZqyaNJ5B3Sjhzo/s1600/qua-chuong-giang-sinh.png" alt="" />
      </div>


      <div className='search'>
        {user?.role !== 'admin' ?
          <SearchComponent />
          : null
        }
      </div>


      <div className='header-right'>
        <ul className='d-flex align-items-center'>
          {user?.role === 'instructor' ? (
            <Link to={`/${ROLE.INSTRUCTOR}/${INSTRUCTOR.CREATE_COURSE}`}>
              <Button
                width='170px'
                height='38px'
                border_radius='3px'
                padding='5px 10px'
                className='create-course'
              >
                {t('header.cncourse')}
              </Button>
            </Link>
          ) : user?.role === 'student' ? (
            <Link to={`/${ROLE.STUDENT}/${STUDENT.INSTRUCTOR_SIGNUP}`}>
              <Button
                width='180px'
                height='38px'
                border_radius='3px'
                padding='5px 10px'
                className='create-course'
              >
                Become to Instructor
              </Button>
            </Link>
          ) : null}
          {userProfile ? (
            <li>
              <Link to={`/shoppingcart`}>
                <span className='icon'>
                  <AiOutlineShoppingCart />
                </span>
              </Link>
              <NotiCount number={cartLength}>
                <NotiCountContainer />
              </NotiCount>
            </li>
          ) : null}
          <li>
            <DropdownHeader
              fullname={user?.fullname}
              email={user?.email}
              user={userJWT}
              image={user?.image}
              userId={user?._id}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
