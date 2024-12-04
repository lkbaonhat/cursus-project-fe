import { useState } from 'react';
import styled from 'styled-components';
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Button } from '@/components/atoms/Button/Button';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  gap: 40px;
  @media (max-width: 1024px) { 
    flex-direction: column; 
    align-items: center;
  }
`;

const Plan = styled.div`
  width: 55%;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  @media (max-width: 1024px) { 
    width: 80%;
  }
`;

const PlanHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #ed2a26;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

const PlanImage = styled.img`
  width: 80px;
  height: auto;
  margin-left: 20px;
  border-radius: 8px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 12px;
  border-radius: 4px;
  padding-bottom: 0;
  transition: background-color 0.3s ease;

  .header {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: 10px;
  }

  .text-container {
    flex-grow: 1;
    font-size: 16px;
  }

  .plus-minus {
    font-size: 16px;
    margin-left: auto;
    cursor: pointer;
  }

  &.active .plus {
    display: none;
  }

  &.active .minus {
    display: inline;
  }
`;

interface DropdownContentProps {
  isActive: boolean;
}

const DropdownContent = styled.div<DropdownContentProps>`
  border-radius: 4px;
  width: 100%;
  transition: max-height 0.5s ease, opacity 0.3s ease;
  overflow: hidden;
  max-height: ${({ isActive }) => (isActive ? '200px' : '0')};
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  display: flex;
  padding-left: 10px;
  p {
    margin: 10px 0 0 0;
    padding: 0;
  }
`;


const CheckIcon = styled(FaCheck)`
  font-size: 18px;
  color: #dc3545;
`;

const CrossIcon = styled(RxCross1)`
  font-size: 18px;
`;

const CardPlan = () => {
  const [openDropdownIndex1, setOpenDropdownIndex1] = useState<number | null>(null);
  const [openDropdownIndex2, setOpenDropdownIndex2] = useState<number | null>(null);

  const toggleDropdown1 = (index: number): void => {
    setOpenDropdownIndex1(openDropdownIndex1 === index ? null : index);
  };

  const toggleDropdown2 = (index: number): void => {
    setOpenDropdownIndex2(openDropdownIndex2 === index ? null : index);
  };

  const features = [
    { icon: <CheckIcon />, text: "Your own shop", info: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.", hasDropdown: true },
    { icon: <CheckIcon />, text: "Online courses", info: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.", hasDropdown: true },
    { icon: <CheckIcon />, text: "Email marketing", info: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.", hasDropdown: true },
    { icon: <CheckIcon />, text: "Messaging", info: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.", hasDropdown: true },
    { icon: <CheckIcon />, text: "Zero charges commissions 10 sales", info: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.", hasDropdown: true },
    { icon: <CheckIcon />, text: "7-days-a-week support", info: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.", hasDropdown: true },
    { icon: <CrossIcon />, text: "Memberships", info: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.", hasDropdown: false },
    { icon: <CrossIcon />, text: "Blog", info: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.", hasDropdown: false },
    { icon: <CrossIcon />, text: "Affiliate marketing", info: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.", hasDropdown: false },
    { icon: <CrossIcon />, text: "Third-party code", info: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.", hasDropdown: false },
  ];

  const babyFeatures = features;
  const businessFeatures = [
    ...babyFeatures.slice(0, 6),
    ...babyFeatures.slice(6, 10).map((feature) => ({
      ...feature,
      icon: <CheckIcon />,
      hasDropdown: true,
    })),
  ];

  return (
    <Container>
      <Plan>
        <PlanHeader>
          <InfoContainer>
            <Title>Baby Plan</Title>
            <Price>$49/month</Price>
            <Description>Save $79 when paid annually</Description>
          </InfoContainer>
          <PlanImage src="https://gambolthemes.net/html-items/cursus-new-demo/images/membership/icon-1.svg" alt="Baby Plan Image" />
        </PlanHeader>
        <Description>For instructors launching their first digital products.</Description>
        <FeatureList>
          {babyFeatures.map((feature, index) => (
            <FeatureItem
              key={index}
              onClick={() => toggleDropdown1(index)}
              className={openDropdownIndex1 === index ? 'active' : ''}
            >
              <div className="header">
                <span className="icon">{feature.icon}</span>
                <div className="text-container">{feature.text}</div>
                {feature.hasDropdown && (
                  <span className={`plus-minus ${openDropdownIndex1 === index ? 'minus' : 'plus'}`}>
                    {openDropdownIndex1 === index ? '-' : '+'}
                  </span>
                )}
              </div>
              {feature.hasDropdown && (
                <DropdownContent isActive={openDropdownIndex1 === index}>
                  <p>{feature.info}</p>
                </DropdownContent>
              )}
            </FeatureItem>
          ))}
        </FeatureList>
        <Button width="98%" height="50px">Purchase Membership</Button>
      </Plan>
      
      <Plan>
        <PlanHeader>
          <InfoContainer>
            <Title>Business Plan</Title>
            <Price>$99/month</Price>
            <Description>Save $189 when paid annually</Description>
          </InfoContainer>
          <PlanImage src="https://gambolthemes.net/html-items/cursus-new-demo/images/membership/icon-2.svg" alt="Business Plan Image" />
        </PlanHeader>
        <Description>For instructors who are ready to grow their business.</Description>
        <FeatureList>
          {businessFeatures.map((feature, index) => (
            <FeatureItem
              key={index}
              onClick={() => toggleDropdown2(index)}
              className={openDropdownIndex2 === index ? 'active' : ''}
            >
              <div className="header">
                <span className="icon">{feature.icon}</span>
                <div className="text-container">{feature.text}</div>
                {feature.hasDropdown && (
                  <span className={`plus-minus ${openDropdownIndex2 === index ? 'minus' : 'plus'}`}>
                    {openDropdownIndex2 === index ? '-' : '+'}
                  </span>
                )}
              </div>
              {feature.hasDropdown && (
                <DropdownContent isActive={openDropdownIndex2 === index}>
                  <p>{feature.info}</p>
                </DropdownContent>
              )}
            </FeatureItem>
          ))}
        </FeatureList>
        <Button width="98%" height="50px">Purchase Membership</Button>
      </Plan>
    </Container>
  );
};

export default CardPlan;
