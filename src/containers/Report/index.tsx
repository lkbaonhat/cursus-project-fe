import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  margin-bottom: 10px;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Content = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
  margin-left: 10px;
  list-style: disc;
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: #4183c4;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #686f7a;
  }
`;

const EmptyState = styled.div`
  font-size: 16px;
  margin-top: 20px;
  text-align: center; 
  width: 100%;
  margin-top: 30px;
`;

const ReportHistory = () => {
  const { t } = useTranslation('report');

  return (
    <Container>
      <Header>{t('report.header')}</Header> 
      <Content>{t('report.content1')}</Content>
      <Content>{t('report.content2')}</Content>
      <ListItem>
        {t('report.listItem1')} <Link href="#">{t('report.CommunityGuidelines')}</Link> {t('report.listItem3')}
      </ListItem>
      <ListItem>{t('report.listItem2')}</ListItem>
      <Link href="#">{t('report.learnMore')}</Link>
      <EmptyState>{t('report.emptyState')}</EmptyState>
    </Container>
  );
};

export default ReportHistory;