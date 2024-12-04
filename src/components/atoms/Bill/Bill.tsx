import { useCart } from "@/utils/hooks/useCart";
import { decodeJWT } from "@/utils/hooks/useUser";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Bill.scss";
import { useDispatch } from "react-redux";
import { TbFidgetSpinner } from "react-icons/tb";
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  width: 100%;
  padding: 30px;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const BillTitle = styled.h4`
  margin: 0px;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Divider = styled.div`
  width: 17%;
  height: 2px;
  background-color: #e60000;
  margin: 20px 0;

  @media (max-width: 1024px) {
    width: 15%;
  }

  @media (max-width: 768px) {
    width: 13%;
  }
`;

const TermsLink = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
`;

const OrderSection = styled.div`
  margin: 30px 0;
  font-size: 14px;
  color: #333;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 1024px) {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const OrderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Origin = styled.span`
  color: #333;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Discount = styled.span`
  font-size: 16px;
  color: grey;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const OrderPrice = styled.div`
  font-size: 14px;
  color: grey;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 1024px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

// Total and price 
const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 1024px) {
    margin-top: 15px;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const Total = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Paragraph = styled.p`
  margin: 25px 0;
  font-size: 14px;
  color: #333;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 1024px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const CouponInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  @media (max-width: 1024px) {
    margin: 8px 0;
  }

  @media (max-width: 768px) {
    margin: 6px 0;
  }
`;

const CouponInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #C0C0C0;
  }

  @media (max-width: 1024px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const ApplyButton = styled.button`
  padding: 8px 16px;
  background-color: #ff3333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;

  &:hover {
    background-color: #e60000;
  }

  @media (max-width: 1024px) {
    padding: 6px 14px;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    padding: 4px 12px;
    font-size: 10px;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff3333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  font-family: 'Roboto', sans-serif;

  &:hover {
    background-color: #e60000;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 8px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px;
  }
`;

const Bill: React.FC = () => {
  /**
   * Get cart items from local storage
   */
  const { t } = useTranslation('shopcart');
  const { getCartItems } = useCart();
  const cartItems = getCartItems();
  const totalPriceFromCart = getCartItems().reduce((acc: any, item: any) => {
    return acc + item.price;
  }, 0);
  //--------------------End----------------------//


  /**
   * Decode JWT token
   */
  const user = decodeJWT();
  //--------------------End----------------------//

  const navigate = useNavigate();

  /**
   * Calculate discount price
   */
  // const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const totalPrice = totalPriceFromCart - discountPrice;
  //--------------------End----------------------//


  const [isloading, setIsLoading] = useState(false);


  /**
   * Handle submit form
   * @param e 
   */
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    setIsLoading(true);

    const orderData = {
      order: {
        userId: user?.sub,
        quantity: cartItems.length,
        totalAmount: totalPrice,
        paymentType: 'VNPay',
        paymentStatus: 'Done',
      },
      orderDetails: cartItems.map((item: any) => ({
        courseId: item._id,
        quantity: 1,
        price: item.price,
      })),
    };

    dispatch({ type: 'createOder', payload: { orderData, setIsLoading, navigate } });
  };
  //--------------------End----------------------//


  return (
    <div className="bill-component">
      {
        getCartItems().length === 0 ? (
          null
        ) : (
          <Container>
            <BillTitle>{t('shopcart.total')}</BillTitle>
            <Divider />
            <OrderSection>
              <OrderTitle>
                <Origin>{t('shopcart.original_price')}</Origin>
                <OrderPrice>{totalPriceFromCart.toLocaleString()} đ</OrderPrice>
              </OrderTitle>
              <TermsLink />
            </OrderSection>
            <TotalRow>
              <Total>{t('shopcart.total')}</Total>
              <Total>{totalPrice.toLocaleString()} đ</Total>
            </TotalRow>
            <TermsLink />
            <Paragraph>{t('shopcart.learn_now_applied')}</Paragraph>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CheckoutButton type="submit" disabled={isloading}>
                {isloading === true && <TbFidgetSpinner className="loading" />}
                {t('shopcart.checkout_now')}
              </CheckoutButton>
            </form>
          </Container>
        )
      }
    </div>
  );
};

export default Bill;
