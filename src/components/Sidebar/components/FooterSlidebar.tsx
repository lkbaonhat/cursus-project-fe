
import styled from "styled-components";

const FooterSlidebarContainer = styled.div`
padding: 10px;
width: 250px;
height: 150px;
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
    cursor: pointer;
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
    return (
        <FooterSlidebarContainer>
            <FooterSlidebarUl>
                <FooterSlidebarLi>About</FooterSlidebarLi>
                <FooterSlidebarLi>Press</FooterSlidebarLi>
                <FooterSlidebarLi>Contact Us</FooterSlidebarLi>
                <FooterSlidebarLi>Advertise</FooterSlidebarLi>
                <FooterSlidebarLi>Developers</FooterSlidebarLi>
                <FooterSlidebarLi>Copyright</FooterSlidebarLi>
                <FooterSlidebarLi>Privacy Policy</FooterSlidebarLi>
                <FooterSlidebarLi>Term</FooterSlidebarLi>
            </FooterSlidebarUl>
            <FooterSlidebarP>
                <p>@ 2024
                    <strong> Cursus</strong>
                    . All Right Reserved.
                </p>
            </FooterSlidebarP>
        </FooterSlidebarContainer>
    )
}
