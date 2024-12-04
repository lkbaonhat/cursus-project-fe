import { SideContent } from './components/SidebarContent';
import { SideContainer } from './components/SideContainer';
import { FooterSlidebar } from './components/FooterSlidebar';
import { colors } from '@/theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectStateIsOpen, selectStateSubscribeChannels } from '@/modules/global/selector';
import { toogleSidebar } from '@/modules/global/slice';
import {
  StudentsLayoutItems,
  InstructorLayoutItems,
  AdminLayoutItems,
  MainLayoutItems,
} from './SidebarItems/items';
import { selectedCategories } from '@/modules/course/selector';
import { ROUTES } from '@/routes';
import { decodeJWT } from '@/utils/hooks/useUser';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Sidebar = ({ role }: any) => {
  let items;

  const dispatch = useDispatch();
  const listCategories = useSelector(selectedCategories);

  const bt_Open = useSelector(selectStateIsOpen); // Trạng thái sidebar từ Redux
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900); // Trạng thái kiểm tra kích thước màn hình

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    const isNowMobile = screenWidth < 900;

    // Chỉ gọi toggleSidebar khi có sự thay đổi trạng thái từ lớn -> nhỏ hoặc ngược lại
    if (isNowMobile !== isMobile) {
      setIsMobile(isNowMobile);

      // Khi chuyển sang chế độ mobile, nếu sidebar đang mở, tự động đóng
      if (isNowMobile && bt_Open) {
        dispatch(toogleSidebar());
      }
    }
  };

  // Lắng nghe sự thay đổi của kích thước màn hình
  useEffect(() => {
    window.addEventListener('resize', handleResize); // Thêm event listener khi resize
    // Cleanup listener khi unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, bt_Open]); // Chỉ thay đổi khi isMobile hoặc bt_Open thay đổi

  // Map the categories to the required format
  const categoryItems = listCategories.map((category: ICourse.Category) => ({
    label: category.name,       // Modify according to your data structure
    link: ROUTES.CATEGORY.replace(':slug', category.slug ?? ''),
  }));

  useEffect(() => {
    // Fetch categories from the server
    dispatch({ type: 'getAllCategories' });
  }, [dispatch]);

  const userID = decodeJWT()?.sub;

  useEffect(() => {
    dispatch({ type: "setSubscribeChannels", payload: userID });
  }, []);

  const subscribeChannels = useSelector(selectStateSubscribeChannels) || [];

  const subscribeItem = subscribeChannels.map(
    (instructor: IINSTRUCTOR.INSTRUCTOR) => ({
      image: instructor.image,
      label: instructor.fullname,
      link: ROUTES.PROFILE.replace(':slug', instructor._id ?? ''),
    })
  );

  if (role === 'guest') {
    items = MainLayoutItems(categoryItems, subscribeItem);
  } else if (role === 'student') {
    items = StudentsLayoutItems;
  } else if (role === 'instructor') {
    items = InstructorLayoutItems;
  } else if (role === 'admin') {
    items = AdminLayoutItems;
  } else {
    items = MainLayoutItems(categoryItems, subscribeItem);
  }

  return (
    <div>
      <SideContainer
        isOpen={bt_Open}
        width='250px'
        backgroundColor={colors.white.bg}
      >
        <div className='content-sidebar'>
          {items?.map((item, index) => (
            <div key={index}>
              <SideContent
                items={item}
                isOpen={bt_Open}
                color={colors.black.title}
                hoverBackgroundColor={colors.red.bg_active}
                hoverColor={colors.red.bg}
                activeBackgroundColor={colors.red.bg_active}
                activeColor={colors.red.bg}
                hoverEnabled={true}
                activeEnabled={true}
              />
              <hr style={{ border: '1px solid #555', margin: '5px 0' }} />
            </div>
          ))}
        </div>
        <div className="noel-footer_sidebar">
          <img src="https://res.cloudinary.com/dwyzqcunj/image/upload/v1732603174/Christmas-tree-gift-element-ornament-year-celebration_160731_wh860-removebg-preview_irpj3o.png"
            alt=""
            style={{ width: '210px', marginLeft: '-10px', marginBottom: '60px' }}
          />
        </div>
      </SideContainer>
    </div>
  );
};
