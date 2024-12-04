
import { useState, useEffect, useRef } from 'react';
import './index.scss';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';


const Navbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  color: black;

  a {
    margin: 0 15px;
    color: black;
    font-weight: bold;
    text-decoration: none; /* Xóa gạch chân */
    position: relative;
    padding-bottom: 5px;

    &.active {
      color: #dd3333;
    }

    &.active::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #dd3333;
      bottom: 0;
      left: 0;
    }
  }
`;


const PageContainer = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  h2 {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

const OurOrigins = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 50px 0;
  background-color: #fff;

  img {
    max-width: 400px;
    border-radius: 5px;
  }

  div {
    max-width: 600px;
    text-align: left;

    h3 {
      color: #dd3333;
      margin-bottom: 20px;
      font-size: 24px;
    }

    p {
      color: #666;
      line-height: 1.6;
      font-size: 16px;
    }
  }
`;

const OfficesSection = styled.div`
  padding: 50px 20px;
  background-color: #f9f9f9;
  text-align: center;

  .office-cards {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
  }

  .office-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: left;

    img {
      width: 100%;
      border-radius: 5px;
      margin-bottom: 15px;
    }

    h3 {
      color: #333;
      font-size: 1.2em;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      font-size: 0.9em;
      line-height: 1.4;
    }
  }
`;

const CompanyDetail = () => {
  const [activePage] = useState('company');
  const [originsInView, setOriginsInView] = useState(false);
  const [officesInView, setOfficesInView] = useState(false);

  const originsRef = useRef<HTMLDivElement | null>(null);
  const officesRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const handleScroll = () => {
      if (originsRef.current) {
        const originsPosition = originsRef.current.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (originsPosition < screenPosition - 100) {
          setOriginsInView(true);
        }
      }

      if (officesRef.current) {
        const officesPosition = officesRef.current.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (officesPosition < screenPosition - 100) {
          setOfficesInView(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar>
        <Nav>
          <Link to={`${ROUTES.ABOUT_US}`} className={activePage === 'aboutus' ? 'active' : ''}>
            About
          </Link>
          <Link to={`${ROUTES.BLOG_DETAIL}`} className={activePage === 'blog' ? 'active' : ''}>
            Blog
          </Link>
          <Link to={`${ROUTES.COMPANY_DETAIL}`} className={activePage === 'company' ? 'active' : ''}>
            Company
          </Link>
          <Link to={`${ROUTES.CAREERS}`} className={activePage === 'careers' ? 'active' : ''}>
            Careers
          </Link>
          <Link to={`${ROUTES.PRESS}`}className={activePage === 'press' ? 'active' : ''}>
            Press
          </Link>
        </Nav>
      </Navbar>
      <PageContainer>
        <h2>Expanding Learning Opportunities</h2>

        <OurOrigins ref={originsRef} className={originsInView ? 'animate-left' : ''}>
          <div>
            <h3>Our Origins</h3>
            <p>
              Cursus was founded in 2020 by computer science instructor with a vision to provide anyone, anywhere with access to the world’s best education. Now many instructors put their courses online for anyone to take and taught more learners in a few months than they could over an entire lifetime in the classroom. Today, Cursus has expanded to reach more than 40 million people and 2,300 businesses around the world. On Cursus you can find online courses, instructors, and certificates from Cursus.
            </p>
          </div>
          <img src="https://gambolthemes.net/html-items/cursus-new-demo/images/about/company.jpg" alt="Our Story Illustration" />
        </OurOrigins>

        <OfficesSection ref={officesRef} className={officesInView ? 'animate-right' : ''}>
          <h2>Our Offices</h2>
          <p>Cursus branches around the world</p>
          <div className="office-cards">
            <div className="office-card">
              <img src="https://gambolthemes.net/html-items/cursus-new-demo/images/about/company-1.jpg" alt="Punjab, India" />
              <h3>Punjab, India</h3>
              <p>#1235 Sks Nagar St No. 8 Phase 3, Pakhowal Road, 141001, LDH, Punjab, India</p>
              <p>📞 0161-1234567</p>
            </div>
            <div className="office-card">
              <img src="https://gambolthemes.net/html-items/cursus-new-demo/images/about/company-2.jpg" alt="San Francisco, CA" />
              <h3>San Francisco, CA</h3>
              <p>586 Lorem st. 5 floor, San Francisco, CA 94107</p>
              <p>📞 +1-415-1234567</p>
            </div>
            <div className="office-card">
              <img src="https://gambolthemes.net/html-items/cursus-new-demo/images/about/company-3.jpg" alt="São Paulo, Brazil" />
              <h3>São Paulo, Brazil</h3>
              <p>Lorem ipsum 589, Vila Madalena, São Paulo - SP 01443-010</p>
              <p>📞 +55-11-1234567</p>
            </div>
          </div>
        </OfficesSection>
      </PageContainer>
    </>
  );
};

export default CompanyDetail;
