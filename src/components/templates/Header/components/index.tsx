import { Avatar } from "@/components/atoms/Avatar/Avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "@/components/molecules/Dropdown/Dropdown";
import { style } from "@/theme";
import { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "@/components/templates/Header/components/styles/index.module.scss";
import { CookiesService } from "@/services/cookies.service";
import { FaRegUserCircle } from "react-icons/fa";
import { ROUTES, STUDENT } from "@/routes";
import { useTranslation } from "react-i18next";
import { decodeJWT } from "@/utils/hooks/useUser";
import { useSelector } from "react-redux";
import { selectIntructerProfile } from "@/modules/global/selector";

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;
`;

const ItemInfoAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemInfoText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const TextTitle = styled.span`
  font-size: ${style.fonts.size.medium};
  color: ${style.colors.black.title};
  font-weight: ${style.fonts.weight.medium};
`;

const TextSubtitle = styled.span`
  font-size: ${style.fonts.size.small};
  color: ${style.colors.gray.text};
`;

const DropdownHeader = ({ ...props }: any) => {
  const { t } = useTranslation(["header"]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const paddingDropdownItem = "10px 15px";

  const handleSignOut = () => {
    CookiesService.remove();
    window.location.reload();
  };

  const user = useSelector(selectIntructerProfile);
  const role = user ? user.role : "";

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownToggle onClick={handleToggle}>
        {!props.user ? (
          <FaRegUserCircle fontSize={"30px"} color="black" />
        ) : (
          <>
            <img src="https://res.cloudinary.com/dwyzqcunj/image/upload/v1732592505/image-Photoroom_zriazs.png" alt="" className={styles.christmas_hat} />
            <Avatar
              src={
                props.image ||
                "https://gambolthemes.net/html-items/cursus-new-demo/images/hd_dp.jpg"
              }
              className="avatar"
            />
          </>
        )}
      </DropdownToggle>

      <DropdownMenu isOpen={isOpen} width="270px">
        {!props.user ? (
          <Link to={`${ROUTES.LOGIN}`} className={styles.dropdown_item}>
            <DropdownItem padding={`${paddingDropdownItem}`}>
              {t("header.login")}
            </DropdownItem>
          </Link>
        ) : (
          <>
            <DropdownItem>
              <Link to={`${ROUTES.PROFILE.replace(":slug", props.userId)}`}>
                <ItemInfo className="px-1 py-2">
                  <ItemInfoAvatar>
                    <Avatar
                      src={
                        props.image ||
                        "https://gambolthemes.net/html-items/cursus-new-demo/images/hd_dp.jpg"
                      }
                      className="avatar"
                    />
                  </ItemInfoAvatar>
                  <ItemInfoText>
                    <div className="d-flex align-items-center">
                      <TextTitle>{props.fullname}</TextTitle>
                      <FaRegCircleCheck className="mx-1 text-primary" />
                    </div>
                    <TextSubtitle>{props.email}</TextSubtitle>
                  </ItemInfoText>
                </ItemInfo>
              </Link>
            </DropdownItem>
            <Link to={`/${role}/dashboard`} className={styles.dropdown_item}>
              <DropdownItem padding={`${paddingDropdownItem}`}>
                {t("header.dashboard")}
              </DropdownItem>
            </Link>

            <Link to={`/${role}/${STUDENT.SETTINGS}`} className={styles.dropdown_item}>
              <DropdownItem padding={`${paddingDropdownItem}`}>
                {t("header.setting")}
              </DropdownItem>
            </Link>

            {/* <Link to={`${STUDENT.FEEDBACK}`} className={styles.dropdown_item}>
              <DropdownItem padding={`${paddingDropdownItem}`}>
                {t('header.feedback')}
              </DropdownItem>
            </Link> */}
            <Link
              to=""
              className={styles.dropdown_item}
              onClick={handleSignOut}
            >
              <DropdownItem padding={`${paddingDropdownItem}`}>
                {t("header.signout")}
              </DropdownItem>
            </Link>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownHeader;
