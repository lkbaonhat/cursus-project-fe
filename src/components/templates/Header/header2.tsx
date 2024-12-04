import { Logo } from "@/components/atoms/Logo/Logo";
import { Link } from "react-router-dom";
import "@/components/templates/Header/header2.scss";
import DropdownHeader from "./components";
import { decodeJWT } from "@/utils/hooks/useUser";
import { useTranslation } from 'react-i18next'

export default function Header2() {
  const { t } = useTranslation(['header']);
  const userJWT = decodeJWT();
  return (
    <div className="header-2 d-flex align-items-center">

      <div className="header-left">
        <Link to={"/"}>{t('header.backto')}</Link>
      </div>

      <div className="main_logo">
        <Link to={"/"}>
          <Logo src="https://gambolthemes.net/html-items/cursus-new-demo/images/logo.svg" />
        </Link>
      </div>


      <div className="header-right">
        <ul>
          <li>
            <DropdownHeader fullname={userJWT?.fullname} email={userJWT?.email} user={userJWT} />
          </li>
        </ul>
      </div>

    </div>
  );
}
