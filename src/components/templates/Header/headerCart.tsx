import { Logo } from "@/components/atoms/Logo/Logo";
import { Link } from "react-router-dom";
import "@/components/templates/Header/headerCart.scss";
import DropdownHeader from "./components";
import { decodeJWT } from "@/utils/hooks/useUser";
import { useTranslation } from 'react-i18next'

export default function HeaderCart() {
  const { t } = useTranslation(['header']);
  const userJWT = decodeJWT();
  
  return (
    <div className="header-quiz-main">
      <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="header-quiz-left">
                    <Link className="back-to-home" to={'/'}>{t('header.backto')}</Link>
                </div>
                <div className="ml-item">
                    <div className="main_logo">
                        <Link to={"/"}>
                            <Logo src="https://gambolthemes.net/html-items/cursus-new-demo/images/logo.svg" />
                          </Link>
                    </div>
                    
                </div>
                 </div>
            </div>  
       </div>
      
    </div>
  );
}
