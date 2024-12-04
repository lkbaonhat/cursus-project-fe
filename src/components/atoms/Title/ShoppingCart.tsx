import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';

const Breadcrumb = styled.nav`
  font-size: 14px;
  color: #555;

  a {
    color: black;
    text-decoration: none;
    margin-right:5px;
  }

  span {
    margin-left:5px;
    color: #555;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 30px 0px 0px;
`;

const ShoppingCart: React.FC = () => {
  const { t } = useTranslation('shopcart');
  return (
    <Container>
      <Breadcrumb>
        <a className='fa-home'>{t('shopcart.home')}</a> /  <span>{t('shopcart.shopping_cart')}</span>
      </Breadcrumb>

      <Title>{t('shopcart.shopping_cart')}</Title>
    </Container>
  );
};

export default ShoppingCart;