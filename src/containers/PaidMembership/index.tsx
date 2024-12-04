import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CardPlan from './components/CardPlan';
import FAQ from './components/FAQ';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: auto;
  font-family: sans-serif;
  z-index: 5;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 10px;
  z-index: 5;
`;

const Breadcrumb = styled.div`
  margin-left: 8%;
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
  text-align: right;
  a {
    color: black;
    text-decoration: none;
    margin-right:5px;
  }
`;

const Title = styled.h1`
  margin-left: 8%;
  font-size: 20px;
  color: #333;
  margin-bottom: 30px;
`;


const PaidMembership = () => {
  return (
    <Container>
      <HeaderContainer>
      <Breadcrumb>
         <Link to="/">Home</Link> / 
          <span style={{ fontWeight: "bold" }}> Paid Membership</span> 
      </Breadcrumb>
        <Title>Paid Membership</Title>
      </HeaderContainer>
      <CardPlan />
      <FAQ />
    </Container>

  );
};

export default PaidMembership;