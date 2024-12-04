import { style } from "@/theme";
import styled from "styled-components";

interface CardNewsProps {
  image: string;
  title: string;
  description: string;
}

const CourseCard = styled.div`
  width: 350px;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: ${style.colors.white.bg};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CourseImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
  border-radius: ${style.size.borderRadius.small};
`;

const CourseTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: ${style.colors.black.title};
`;

const CourseStats = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const StatItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatValue = styled.div`
  font-size: ${style.fonts.size.medium};
  color: #686f7a;
`;

const ActionLink = styled.a`
  display: block;
  margin: 10px 0;
  text-decoration: none;
  font-size: 0.9rem;
  color: ${style.colors.black.title};

  &:hover {
    text-decoration: underline;
    color: ${style.colors.black.title};
  }
`;

const CardNews = (props: CardNewsProps & MODEL.IStyleProps) => {
  return (
    <CourseCard>
      <CourseImage src={props.image} alt="News Image" />
      <CourseTitle>{props.title}</CourseTitle>
      <CourseStats>
        <StatItem>
          <StatValue>{props.description}k</StatValue>
        </StatItem>
      </CourseStats>
      <hr />
      <ActionLink href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">LEARN MORE</ActionLink>
    </CourseCard>
  );
};

export default CardNews;
