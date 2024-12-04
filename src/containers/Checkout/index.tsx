import styled from 'styled-components';
import BillingDetails from './components/BillingDetails';
import SelectPaymentMethod from './components/SelectPaymentMethod';
import OrderSummary from './components/OrderSummary';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


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
  margin-left: 30px;
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
  a {
    color: black;
    text-decoration: none;
    margin-right:5px;
  }
`;

const Title = styled.h1`
  margin-left: 30px;
  font-size: 20px;
  color: #333;
  margin-bottom: 30px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;

  @media (max-width: 1024px) {
    flex-direction: column; /* Sắp xếp theo chiều dọc */
  }
`;

const BillingAndPayment = styled.div`
  width: 65%; // Chiếm 65% chiều rộng màn hình
  margin-right: 20px;

  @media (max-width: 1024px) {
    width: 100%; // Chiếm toàn bộ chiều rộng màn hình
    margin-bottom: 20px;
  }
`;

const CheckoutPage = () => {
  const { t } = useTranslation('checkout');
  return (
    <Container>
      <HeaderContainer>
        <Breadcrumb>
          <Link to="/">{t('checkout.home')}</Link> /
          <span style={{ fontWeight: "bold" }}> {t('checkout.title')}</span>
        </Breadcrumb>
        <Title>{t('checkout.title')}</Title>
      </HeaderContainer>
      <ContentContainer>
        <BillingAndPayment>
          <BillingDetails />
          <SelectPaymentMethod />
        </BillingAndPayment>
        <OrderSummary />
      </ContentContainer>
    </Container>
  );
};

export default CheckoutPage;