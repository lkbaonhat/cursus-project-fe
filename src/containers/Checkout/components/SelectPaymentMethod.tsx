import React, { useState } from "react";
import styled from "styled-components";
import { CiCreditCard2, CiBank } from "react-icons/ci";
import { RiPaypalLine } from "react-icons/ri";
import { Button } from "@/components/atoms/Button/Button";
import { useTranslation } from 'react-i18next';

// Simplified Component Names
const PaymentForm = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: auto;
  font-family: sans-serif;
  margin-top: 20px;
  z-index: 5;
`;

const SectionTitle = styled.h4`
  margin-bottom: 20px;
`;

const PaymentMethodList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
`;

const PaymentOption = styled.div<{ active: boolean }>`
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f2f2f2;
  width: 33.33%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  opacity: 1;
  color: ${(props) => (props.active ? "#ed2a26" : "black")};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #ed2a26;
    opacity: ${(props) => (props.active ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
  }
`;

const PaymentIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const CustomSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 3px;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path d='M8 11.5L3.5 7L8 2.5' stroke='black' stroke-width='2'></path></svg>");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px 12px;
  cursor: pointer;
  option {
    padding: 10px 15px;
  }
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 100%;
  margin-right: 20px;
`;

const FieldLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const InputBox = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 3px;
`;

const PaymentDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, max-height 0.5s ease-in-out;
  max-height: 0;
  overflow: hidden;
  width: 100%;

  &.visible {
    opacity: 1;
    max-height: 700px;
  }
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  width: 100%;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-weight: bold;
  width: 100%;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const LineBreak = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #aaa;
  margin: 10px 0;
`;

const Separator = styled.hr`
  width: 19%;
  border: none;
  border-top: 2px solid #ed2a26;
  margin: 10px 0;
`;

const PaymentMethodForm: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState("Credit/Debit Card");
  const { t } = useTranslation('checkout');

  const handlePaymentMethodChange = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <PaymentForm>
      <SectionTitle>{t('checkout.selectpaymentmethod')}</SectionTitle>
      <PaymentMethodList>
        <PaymentOption
          active={selectedMethod === "Credit/Debit Card"}
          onClick={() => handlePaymentMethodChange("Credit/Debit Card")}
        >
          <PaymentIcon>
            <CiCreditCard2 />
          </PaymentIcon>
          {t('checkout.Credit/Debit Card')}
        </PaymentOption>

        <PaymentOption
          active={selectedMethod === "Bank Transfer"}
          onClick={() => handlePaymentMethodChange("Bank Transfer")}
        >
          <PaymentIcon>
            <CiBank />
          </PaymentIcon>
          {t('checkout.Bank Transfer')}
        </PaymentOption>

        <PaymentOption
          active={selectedMethod === "VNPay"}
          onClick={() => handlePaymentMethodChange("VNPay")}
        >
          <PaymentIcon>
            <RiPaypalLine />
          </PaymentIcon>
          {t('checkout.VNPay')}
        </PaymentOption>
      </PaymentMethodList>
      <PaymentDetails
        className={selectedMethod === "Credit/Debit Card" ? "visible" : ""}
      >
        <InputRow>
          <InputField>
            <FieldLabel htmlFor="holderName">{t('checkout.Holder Name')}</FieldLabel>
            <InputBox
              type="text"
              id="holderName"
              placeholder={t('checkout.Enter Holder Name')}
            />
          </InputField>
          <InputField>
            <FieldLabel htmlFor="cardNumber">{t('checkout.Card Number')}</FieldLabel>
            <InputBox type="text" id="cardNumber" placeholder={t('checkout.Card #')} />
          </InputField>
        </InputRow>
        <InputRow>
          <InputField>
            <FieldLabel htmlFor="expirationMonth">{t('checkout.Expiration Month')}</FieldLabel>
            <CustomSelect id="expirationMonth">
              <option value="January">{t('checkout.january')}</option>
              <option value="February">{t('checkout.february')}</option>
              <option value="March">{t('checkout.march')}</option>
              <option value="April">{t('checkout.april')}</option>
              <option value="May">{t('checkout.may')}</option>
              <option value="June">{t('checkout.june')}</option>
              <option value="July">{t('checkout.july')}</option>
              <option value="August">{t('checkout.august')}</option>
              <option value="September">{t('checkout.september')}</option>
              <option value="October">{t('checkout.october')}</option>
              <option value="November">{t('checkout.november')}</option>
              <option value="December">{t('checkout.december')}</option>
            </CustomSelect>
          </InputField>
          <InputField>
            <FieldLabel htmlFor="expirationYear">{t('checkout.Expiration Year')}</FieldLabel>
            <InputBox type="text" id="expirationYear" placeholder={t('checkout.Year')} />
          </InputField>
          <InputField>
            <FieldLabel htmlFor="cvc">{t('checkout.CVC')}</FieldLabel>
            <InputBox type="text" id="cvc" placeholder={t('checkout.CVC')} />
          </InputField>
        </InputRow>
      </PaymentDetails>

      {/* Bank Transfer Details */}
      <PaymentDetails
        className={selectedMethod === "Bank Transfer" ? "visible" : ""}
      >
        <InputRow>
          <InputField>
            <FieldLabel htmlFor="accountHolderName">{t('checkout.Account Holder Name')}</FieldLabel>
            <InputBox
              type="text"
              id="accountHolderName"
              placeholder={t('checkout.Enter Your Full Name')}
            />
          </InputField>
          <InputField>
            <FieldLabel htmlFor="accountNumber">{t('checkout.Account Number')}</FieldLabel>
            <InputBox
              type="text"
              id="accountNumber"
              placeholder={t('checkout.Enter Account Number')}
            />
          </InputField>
        </InputRow>
        <InputRow>
          <InputField>
            <FieldLabel htmlFor="bankName">{t('checkout.Bank Name')}</FieldLabel>
            <CustomSelect id="bankName">
              <option value="State Bank of India">{t('checkout.State Bank of India')}</option>
              {/* Add more bank options here */}
            </CustomSelect>
          </InputField>
          <InputField>
            <FieldLabel htmlFor="ifscCode">{t('checkout.IFSC Code')}</FieldLabel>
            <InputBox type="text" id="ifscCode" placeholder={t('checkout.Enter IFSC Code')} />
          </InputField>
        </InputRow>
      </PaymentDetails>
      <PaymentDetails
        className={selectedMethod === "VNPay" ? "visible" : ""}
      >
        <span>
          {t('checkout.Afterpayment')}
        </span>
        <span>{t('checkout.PayPal accepts')}</span>
      </PaymentDetails>

      <OrderSummary>
        <SectionTitle>{t('checkout.Order Details')}</SectionTitle>
        <Separator />
        <OrderItem>
          <span>{t('checkout.Baby Plan')}</span>
          <span>$49</span>
        </OrderItem>
        <LineBreak />
        <OrderItem>
          <span>{t('checkout.Taxes(GST)')}</span>
          <span>$2</span>
        </OrderItem>
        <LineBreak />
        <OrderTotal>
          <span>{t('checkout.Total')}</span>
          <span>$51</span>
        </OrderTotal>
      </OrderSummary>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Button width="25%" border_radius="3px">
          {t('checkout.Confirm Checkout')}
        </Button>
      </div>
    </PaymentForm>
  );
};

export default PaymentMethodForm;