import { SideContent } from "./components/SidebarContent";
import { SideContainer } from "./components/SideContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { colors } from "@/theme/colors";
import { selectState } from "@/modules/global/selector";
import { toogleSidebar } from "@/modules/global/slice";

interface SidebarCourseProps {
  slideItems: any;
}

export const SidebarCourse = (props: SidebarCourseProps) => {
  const dispatch = useDispatch();
  const bt_Open = useSelector(selectState).isOpen;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    const isNowMobile = screenWidth < 900;
    if (isNowMobile !== isMobile) {
      setIsMobile(isNowMobile);
      if (isNowMobile && bt_Open) {
        dispatch(toogleSidebar());
      }
    } else {
      setIsMobile(!isNowMobile);
      if (!isNowMobile && !bt_Open) {
        dispatch(toogleSidebar());
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, bt_Open]);

  return (
    <div>
      <SideContainer
        isOpen={bt_Open}
        width="300px"
        backgroundColor={colors.white.bg}
      >
        <div>
          <h5 style={{ margin: "13px 20px" }}>Course content</h5>
          <SideContent
            items={props.slideItems}
            isOpen={bt_Open}
            color={colors.black.title}
            hoverBackgroundColor={colors.red.bg_active}
            hoverColor={colors.red.bg}
            activeBackgroundColor={colors.red.bg_active}
            activeColor={colors.red.bg}
            hoverEnabled={true}
            activeEnabled={true}
          />
        </div>
      </SideContainer>
    </div>
  );
};
