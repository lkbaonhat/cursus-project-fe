import { useState, useEffect, useRef } from 'react';
import './index.scss';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaMobileAlt, FaUserGraduate, FaCertificate, FaGlobe} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/routes';

const Navbar = styled.div`
  display: flex;
  justify-content: center;
  color: black;

  a {
    margin: 0 15px;
    color: black;
    font-weight: bold;
    text-decoration: none;
    position: relative;

    &.active {
      color: #dd3333;
    }

    &:hover::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #dd3333;
      bottom: -5px;
      left: 0;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 30px;
    margin-right: 70px;
  }

`;

const ResizableContainer = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  padding: 20px;
  resize: both;
  overflow: auto;
  background-color: #fff;
`;

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  color: black;

  button {
    margin: 0 15px;
    color: black;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    position: relative;

    &:hover::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #dd3333;
      bottom: -5px;
      left: 0;
    }
  }
`;



const MainContent = styled.div`
  text-align: center;
  padding: 50px 0px;
  background-color: white;
  background-size: cover;
  background-position: center;
  color: #fff;

  h1 {
  padding: 50px;
  color: #333;
  margin-top: 20px;
  font-size: 30px;
  }
`;

const FeaturesSection = styled.div`
  padding: 50px 20px;
  background-color: #fff;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 40px;
    color: #666;
  }
`;

const FeaturesGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  div {
    flex: 1;
    max-width: 200px;
    margin: 10px;
    text-align: center;

    svg {
      font-size: 2em;
      color: #dd3333;
      margin-bottom: 10px;
    }

    p {
      color: #666;
    }
  }
`;

const StorySection = styled.div`
  padding: 50px 20px;
  display: flex;
  background-color: #f9f9f9;
  justify-content: space-around;
  align-items: center;

  img {
    max-width: 400px;
    margin-left: 20px;
  }

  div {
    max-width: 600px;
    text-align: left;

    h2 {
      margin-bottom: 20px;
      color: #dd3333;
    }

    p {
      color: #666;
    }
  }
`;

const GlobalReachSection = styled.div`
  padding: 50px 20px;
  background-color: #fff;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 40px;
    color: #666;
  }
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  div {
    flex: 1;
    max-width: 150px;
    margin: 10px;
    text-align: center;

    h3 {
      color: #dd3333;
      font-size: 1.5em;
      margin-bottom: 5px;
    }

    p {
      color: #666;
    }
  }
`;

const TeamSection = styled.div`
  padding: 50px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;

  img {
    max-width: 400px;
    margin-left: 20px;
  }

  div {
    max-width: 600px;
    text-align: left;

    h2 {
      margin-bottom: 20px;
      color: #dd3333;
    }

    p {
      color: #666;
      margin-bottom: 20px;
    }
  }
`;

const JoinButton = styled.button`
  background-color: #dd3333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #c12e2e;
  }
`;

const AboutUs = () => {
  const { t } = useTranslation('aboutUs'); 
  const [activePage, setActivePage] = useState('aboutus');
  const featuresRef = useRef(null);
  const storyRef = useRef(null);
  const globalReachRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(entry.target.getAttribute('data-animation') || '');
        }
      });
    });

    const sections = [
      featuresRef.current,
      storyRef.current,
      globalReachRef.current,
      teamRef.current,
    ];

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'blog':
        return <p>{t('aboutUs.blogPage')}</p>;
      case 'company':
        return <p>{t('aboutUs.companydetail')}</p>;
      case 'careers':
        return <p>{t('aboutUs.careersPage')}</p>;
      case 'press':
        return <p>{t('aboutUs.pressPage')}</p>;
      default:
        return <p>{t('aboutUs.aboutPage')}</p>;
    }
  };

  return (
    <>
    <ResizableContainer>
      <PageContainer>
        <MainContent>
          <Logo />
          <Navbar>
          <Nav>
            <Link to={`${ROUTES.ABOUT_US}`}  className={activePage === 'aboutus' ? 'active' : ''} onClick={() => handlePageChange('aboutus')}>
              About
            </Link>
            <Link to={`${ROUTES.BLOG_DETAIL}`} className={activePage === 'blog' ? 'active' : ''} onClick={() => handlePageChange('blog')}>
              Blog
            </Link>
            <Link to={`${ROUTES.COMPANY_DETAIL}`}  className={activePage === 'company' ? 'active' : ''} onClick={() => handlePageChange('company')}>
              Company
            </Link>
            <Link to={`${ROUTES.CAREERS}`}  className={activePage === 'careers' ? 'active' : ''} onClick={() => handlePageChange('careers')}>
              Careers
            </Link>
            <Link to={`${ROUTES.PRESS}`}  className={activePage === 'press' ? 'active' : ''} onClick={() => handlePageChange('press')}>
              Press
            </Link>
          </Nav>
        </Navbar>
          {renderContent()}
          <h1>{t('aboutUs.mainHeading')}</h1>
          </MainContent>
          <FeaturesSection ref={featuresRef} data-animation="animate-left">
            <h2>{t('aboutUs.features')}</h2>
            <p>{t('aboutUs.featuresDescription')}</p>
            <FeaturesGrid>
            <div>
              <FaMobileAlt />
              <h3>{t('aboutUs.mobileLearning')}</h3>
                <p>{t('aboutUs.mobileLearningDescription')}</p>
              </div>
            <div>
              <FaUserGraduate />
              <h3>{t('aboutUs.academicSupport')}</h3>
                <p>{t('aboutUs.academicSupportDescription')}</p>
              </div>
            <div>
              <FaCertificate />
              <h3>{t('aboutUs.sharableCertificates')}</h3>
                <p>{t('aboutUs.sharableCertificatesDescription')}</p>
              </div>
            <div>
              <FaGlobe />
              <h3>{t('aboutUs.inclusiveExperience')}</h3>
                <p>{t('aboutUs.inclusiveExperienceDescription')}</p>
              </div>
          </FeaturesGrid>
        </FeaturesSection>
        <StorySection ref={storyRef} data-animation="animate-right">
          <div>
          <h2>{t('aboutUs.story')}</h2>
              <p>{t('aboutUs.storyDescription')}</p>
          </div>
          <img src="https://gambolthemes.net/html-items/cursus-new-demo/images/about/stroy_img.png" alt="Our Story Illustration" />
        </StorySection>
        <GlobalReachSection ref={globalReachRef} data-animation="animate-left">
        <h2>{t('aboutUs.globalReach')}</h2>
            <p>{t('aboutUs.globalReachDescription')}</p>
            <StatsGrid>
              <div>
                <h3>{t('aboutUs.instructorsCount')}</h3>
                <p>{t('aboutUs.instructors')}</p>
              </div>
              <div>
                <h3>{t('aboutUs.coursesCount')}</h3>
                <p>{t('aboutUs.courses')}</p>
              </div>
              <div>
                <h3>{t('aboutUs.enrollmentsCount')}</h3>
                <p>{t('aboutUs.enrollments')}</p>
              </div>
              <div>
                <h3>{t('aboutUs.languagesCount')}</h3>
                <p>{t('aboutUs.languages')}</p>
              </div>
              <div>
                <h3>{t('aboutUs.partnersCount')}</h3>
                <p>{t('aboutUs.partners')}</p>
              </div>
              <div>
                <h3>{t('aboutUs.countriesCount')}</h3>
                <p>{t('aboutUs.countries')}</p>
              </div>
            </StatsGrid>
          </GlobalReachSection>
          <TeamSection ref={teamRef} data-animation="animate-right">
            <div>
              <h2>{t('aboutUs.team')}</h2>
              <p>{t('aboutUs.teamDescription1')}</p>
              <p>{t('aboutUs.teamDescription2')}</p>
              <JoinButton>{t('aboutUs.joinOurTeam')}</JoinButton>
            </div>
            <img src="https://gambolthemes.net/html-items/cursus-new-demo/images/about/team.jpg" alt="Our Team" />
          </TeamSection>
        </PageContainer>
      </ResizableContainer>
    </>
  );
};

export default AboutUs;