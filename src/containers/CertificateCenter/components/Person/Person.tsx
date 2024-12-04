import styled from "styled-components";
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333;
  padding: 60px 0;

  @media (max-width: 768px){
     width: 100%;
  }

  @media (max-width: 575px){
     width: 100%;
  }
`;

const Title = styled.h2`
  color: #fff;
  margin-bottom: 40px;
  font-size: 24px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;

  @media (max-width: 768px){
     font-size: 20px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;

  @media (max-width: 575px){
     flex-direction: column;
     gap: 20px;
  }
`;

const Card = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Img = styled.img`
  width: 65%;
`;

const Label = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-top: 20px;
  font-family: "Roboto", sans-serif;
`;

const ImgWrap = styled.div`
  width: 150px;
  height: 150px;
  background: #fff;
  border-radius: 100%;
  display: inline-block;
  padding: 15px 0;
  border: 5px solid #fff;
`;

const Person = () => {
  const { t } = useTranslation('certificate');

  return (
    <Container>
      <Title>{t('certificate.whoCanBenefit')}</Title>
      <CardContainer>
        <Card>
          <ImgWrap>
            <Img
              src="https://gambolthemes.net/html-items/cursus-new-demo/images/cerificate_center/student.svg"
              alt="Students"
            />
          </ImgWrap>
          <Label>{t('certificate.students')}</Label>
        </Card>

        <Card>
          <ImgWrap>
            <Img
              src="https://gambolthemes.net/html-items/cursus-new-demo/images/cerificate_center/instructor.svg"
              alt="Instructor"
            />
          </ImgWrap>
          <Label>{t('certificate.instructors')}</Label>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default Person;
