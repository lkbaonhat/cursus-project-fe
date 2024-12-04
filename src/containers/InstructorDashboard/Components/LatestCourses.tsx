import styled from "styled-components";

const CourseCard = styled.div`
  width: 350px;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CourseImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
  border-radius: 4px;
`;

const CourseTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #333;
`;

const CourseInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
`;

const CourseStats = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const StatItem = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatValue = styled.div`
  font-size: 14px;
  color: #686f7a;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #686f7a;
`;

const ActionLink = styled.a`
  display: block;
  margin: 10px 0;
  text-decoration: none;
  font-size: 0.9rem;
  color: #333;

  &:hover {
    text-decoration: underline;
    color: #333;
  }
`;

const LatestCourses = (
  props: IINSTRUCTOR.INSTRUCTOR_COURSEDASHBOARD & MODEL.IStyleProps
) => {
  return (
    <CourseCard>
      <CourseImage src={props.image} alt="Course Image" />
      <CourseInfo>Third 6 days 11 hours:</CourseInfo>
      <CourseTitle>{props.title}</CourseTitle>
      <CourseStats>
        <StatItem>
          <StatLabel>View</StatLabel>
          <StatValue>{props.view}k</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Purchased</StatLabel>
          <StatValue>{props.purchased}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Total Like</StatLabel>
          <StatValue>{props.totalLike}k</StatValue>
        </StatItem>
      </CourseStats>
      <hr />
      <ActionLink href="/instructor/analyics">GO TO COURSE ANALYTICS</ActionLink>
      <ActionLink href="/instructor/analyics">COMMENTS (155)</ActionLink>
      <ActionLink href="/instructor/analyics">REVIEWS (15)</ActionLink>
    </CourseCard>
  );
};

export default LatestCourses;
