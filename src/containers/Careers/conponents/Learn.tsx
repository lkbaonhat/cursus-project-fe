import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 120px;
  background-color: #eee;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  text-align: center;
  animation: ${({ direction, isAnimating }) => 
  isAnimating ? (direction === 'left' ? 
  slideInLeft : slideInRight) : 'none'} 0.5s ease forwards;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  margin-left: 10px; 
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

const ArrowIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: #333;
`;

const Learn = () => {
  const { t } = useTranslation('careers'); 
  const [currentTab, setCurrentTab] = useState(0); 
  const [direction, setDirection] = useState('left');
  const [isAnimating, setIsAnimating] = useState(false);

  const tabs = [
    {
      title: t('careers.tabs.tab1.title'),
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan. Nunc at tortor tellus. Cras dignissim velit velit, ac sollicitudin mi bibendum in. In vel nibh sodales, venenatis eros a, vulputate ligula.",
      avatar: "https://gambolthemes.net/html-items/cursus-new-demo/images/about/career-1.jpg"
    },
    {
      title: t('careers.tabs.tab2.title'),
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan. Nunc at tortor tellus. Cras dignissim velit velit, ac sollicitudin mi bibendum in. In vel nibh sodales, venenatis eros a, vulputate ligula.",
      avatar: "https://gambolthemes.net/html-items/cursus-new-demo/images/about/career-2.jpg" 
    },
    {
      title: t('careers.tabs.tab3.title'),
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan. Nunc at tortor tellus. Cras dignissim velit velit, ac sollicitudin mi bibendum in. In vel nibh sodales, venenatis eros a, vulputate ligula.",
      avatar: "https://gambolthemes.net/html-items/cursus-new-demo/images/about/career-3.jpg" 
    },
    {
      title: t('careers.tabs.tab4.title'),
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget enim in turpis consequat tempor sed id neque. Nam at felis et elit auctor accumsan. Nunc at tortor tellus. Cras dignissim velit velit, ac sollicitudin mi bibendum in. In vel nibh sodales, venenatis eros a, vulputate ligula.",
      avatar: "https://gambolthemes.net/html-items/cursus-new-demo/images/about/career-4.jpg" 
    },
  ];

  const handleTabChange = (direction: number) => {
    setDirection(direction > 0 ? 'left' : 'right');
    setIsAnimating(true); 

    let newTab = currentTab + direction;
    if (newTab < 0) {
      newTab = tabs.length - 1;
    } else if (newTab >= tabs.length) {
      newTab = 0;
    }
    setCurrentTab(newTab);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTabData = tabs[currentTab];

  return (
    <Container>
      <Arrow onClick={() => handleTabChange(-1)}>
        <ArrowIcon viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </ArrowIcon>
      </Arrow>
      <Content direction={direction} isAnimating={isAnimating}>
        <Avatar src={currentTabData.avatar} alt="Avatar" />
        <Title>{currentTabData.title}</Title> 
        <Description>{currentTabData.description}</Description>
      </Content>
      <Arrow onClick={() => handleTabChange(1)}>
        <ArrowIcon viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </ArrowIcon>
      </Arrow>
    </Container>
  );
};

export default Learn;