
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

const FooterSlidebarContainer = styled.div`
padding: 10px;
width: 250px;
height: 200px;
`
const FooterSlidebarLi = styled.div`
    text-decoration: none;
    font-size: 14px;
    width: fit-content;
    display: inline-block;
    padding: 0 5px;
    font-weight: 500;
`
const FooterSlidebarUl = styled.div`
text-align: left;
`

const FooterSlidebarP = styled.p`
    font-size: 14px;
    font-weight: 500;
    width: fit-content;
    display: inline-block;
    padding-top: 5px;
    margin: 0;
    color: #AFAFAF;
`
export const FooterSlidebar = () => {
    const { t } = useTranslation('sidebar'); 
  return (
    <FooterSlidebarContainer>
        <FooterSlidebarUl>
            <FooterSlidebarLi>{t('sidebar.about')}</FooterSlidebarLi>
            <FooterSlidebarLi>{t('sidebar.press')}</FooterSlidebarLi>
            <FooterSlidebarLi>{t('sidebar.contact_us')}</FooterSlidebarLi>
            <FooterSlidebarLi>{t('sidebar.advertise')}</FooterSlidebarLi>
            <FooterSlidebarLi>{t('sidebar.developers')}</FooterSlidebarLi>
            <FooterSlidebarLi>{t('sidebar.copyright')}</FooterSlidebarLi>
            <FooterSlidebarLi>{t('sidebar.privacy_policy')}</FooterSlidebarLi>
            <FooterSlidebarLi>{t('sidebar.term')}</FooterSlidebarLi>
        </FooterSlidebarUl>
        <FooterSlidebarP>
        <p>
          @ 2024{" "}
          <strong>{t('sidebar.cursus')}</strong>
          . {t('sidebar.all_rights_reserved')}
        </p>
        </FooterSlidebarP>
    </FooterSlidebarContainer>
  )
}
