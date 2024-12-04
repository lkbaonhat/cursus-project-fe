import { CircleHelp, LandPlot, MessageSquareMore } from "lucide-react";
import { useTranslation } from 'react-i18next'; 
import './styles.scss';

export default function Contact() {
  const { t } = useTranslation('contact'); 
  return (
    <div className='container'>
      <section className='main-title'>
        <h1>{t('contact.title')}</h1>
      </section>

      <section className='contact-section'>
        <div className='grid-container'>
          <div className='card'>
            <div className='icon-wrapper'>
              <CircleHelp />
            </div>
            <p>{t('contact.help_center')}</p>
          </div>
          <div className='card'>
            <div className='icon-wrapper'>
              <MessageSquareMore />
            </div>
            <p>{t('contact.blog')}</p>
          </div>
          <div className='card'>
            <div className='icon-wrapper'>
              <CircleHelp />
            </div>
            <p>{t('contact.careers')}</p>
          </div>
          <div className='card'>
            <div className='icon-wrapper'>
              <LandPlot />
            </div>
            <p>{t('contact.developer_area')}</p>
          </div>
        </div>

        <div className='map-contact-info'>
          <div className='map-container'>
            <img
              src='https://joomly.net/frontend/web/images/googlemap/map.png'
              alt='map'
            />
          </div>

          <div className='contact-info'>
            <h1>{t('contact.contact_information')}</h1>
            <div className='divider'></div>

            <div className='info-grid'>
              <p>{t('contact.main_address')}:</p>
              <p>{t('contact.address')}</p>

              <p>{t('contact.email_address')}:</p>
              <p>{t('contact.email')}</p>

              <p>{t('contact.phone_number')}:</p>
              <p>{t('contact.phone')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}