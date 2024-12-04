import styled from "styled-components";
import { CiLock } from "react-icons/ci";
import { useTranslation } from 'react-i18next';

const OrderSummary = styled.div`
  width: 35%;
  height: 320px;
  padding: 20px;
  border: 1px solid #eee;
  background-color: #fff;
  border-radius: 5px;
  position: sticky;
  top: 80px;
  z-index: 10;
  h3 {
    color: #333;
    margin-bottom: 10px;
  }
  hr {
    margin-bottom: 15px;
  }
  .summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .total {
    font-weight: bold;
    font-size: 18px;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
  .small-hr { 
    margin-bottom: 5px;
    width: 50px; 
    color: #ed2a26;
  }
  span:last-child { 
    display: block; 
    text-align: center;
    margin-top: 15px; 
  }
`;

const OrderSummaryComponent = () => {
  const { t } = useTranslation('checkout');
  return (
    <OrderSummary>
      <h3>{t('checkout.orderSummary')}</h3>  
      <hr className="small-hr" />
      <div className="summary-item">
        <span style={{ fontWeight: "bold" }}>{t('checkout.babyPlan')}</span>
        <span>$49</span>
      </div>
      <hr />
      <div className="summary-item">
        <span>{t('checkout.taxes')}</span>
        <span>$2</span>
      </div>
      <hr />
      <div className="summary-item total">
        <span>{t('checkout.total')}</span>
        <span>$51</span>
      </div>
      <span> <CiLock />{t('checkout.secureCheckout')}</span> 
    </OrderSummary>
  );
};

export default OrderSummaryComponent;
