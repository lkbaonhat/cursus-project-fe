import { Button } from "@/components/atoms/Button/Button";
import { CardAction, CardBody, CardHeader } from "./CardContact";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

export const CardBIContainer = styled.div`
  background-color: #ffff;
  border-radius: 5px;
  margin-top: 30px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  p {
    font-size: 14px;
  }
`;

export default function CardBecomeInstructors() {
  const { t } = useTranslation(["home"]);
  return (
    <CardBIContainer>
      <CardHeader className="p-0 mb-2">
        <h4 className="fs-5">{t('home.become_an_instructor')}</h4>
      </CardHeader>
      <CardBody className="p-0 mb-2">
        <p className="lh-lg">
          {t('home.top_instructors_message')}
        </p>
      </CardBody>
      <CardAction className="d-flex justify-content-center py-3">
        <Button width="35%" height="50px" fontSize="14px" border_radius="4px">
          {t("home.start_teaching")}
        </Button>
      </CardAction>
    </CardBIContainer>
  );
}