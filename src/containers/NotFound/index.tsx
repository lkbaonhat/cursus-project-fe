import { Link } from 'react-router-dom';
import './index.scss';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation('notfound');

  return (
    <div className="not-found">
      <img src="https://gambolthemes.net/html-items/cursus-new-demo/images/ct_logo.svg" alt="" />
      <h1>404</h1>
      <h4>{t('notfound.page_not_found')}</h4>
      <Link to="/">{t('notfound.go_back_to_home')}</Link>
    </div>
  );
};

export default NotFound;