import styled from "styled-components";
import { Button } from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";
import { ROLE, STUDENT } from "@/routes";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #eee;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const RoleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
    align-items: center;
  }
`;

const RoleCard = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 70px 70px 50px 70px;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 992px) {
    padding: 90px 90px 70px 90px;
    width: 100%;
  }
`;
const RoleTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const RoleLocation = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

const OpenRoles = () => {
  const { t } = useTranslation("careers");
  const roles = t("careers.roles", { returnObjects: true }); // Lấy danh sách roles từ file JSON

  //Navigate to apply job page
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/${ROLE.STUDENT}/${STUDENT.APPLY_JOB}`);
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      <Title>{t("careers.title2")}</Title>
      <Subtitle>{t("careers.subtitle2")}</Subtitle>
      <RoleContainer>
        {Array.isArray(roles)&& roles.map((role, index) => (
          <RoleCard key={index}>
            <RoleTitle>{role.title}</RoleTitle>
            <RoleLocation>{role.location}</RoleLocation>
            <Button
              width="300px"
              border_radius="2px"
              onClick={handleButtonClick}
            >
              {t("careers.button")}
            </Button>
          </RoleCard>
        ))}
      </RoleContainer>
    </Container>
  );
};

export default OpenRoles;
