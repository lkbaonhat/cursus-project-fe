import { Link, useLocation } from 'react-router-dom'
import './index.scss'
import { ROUTES } from '@/routes'
import { useDispatch, useSelector } from 'react-redux'
import { selectStateOrderId } from '@/modules/global/selector'
import { resetOrderId } from '@/modules/global/slice'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

export default function ThankYou() {
  /**
   * Handle with orderId (by Redux)
   */
  const { t } = useTranslation('thankyou');

  const orderId = useSelector(selectStateOrderId)
  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(() => {
    return () => {
      if (location.pathname !== ROUTES.THANKYOU) {
        dispatch(resetOrderId());
      }
    };
  }, [location.pathname]);
  //----------------------End----------------------//

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-700 to-black text-white flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <a href="/">
          <img src='https://gambolthemes.net/html-items/cursus-new-demo/images/ct_logo.svg' alt="Logo" className="logo mb-4" />
        </a>
        <h1 className="text-large font-bold mb-4">{t('thankyou.title')}</h1>

        <p className="text-xl mb-2">{t('thankyou.order_confirmed')}</p>
        <p className="text-sm text-gray-400">
          {t('thankyou.order_number')} <span className="text-red-500">{orderId}</span>
        </p>
        <Link to={`${ROUTES.HOME}`} className='hover:text-white transition-colors text-gray-300 mt-4'>{t('thankyou.backhome')}</Link>
      </main>

      <footer className="p-4">
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition-colors text-gray-300 mt-4">{t('thankyou.home')}</Link>
          <Link to="/shop" className="hover:text-white transition-colors text-gray-300 mt-4">{t('thankyou.shop')}</Link>
          <Link to={`${ROUTES.CONTACT}`} className="hover:text-white transition-colors text-gray-300 mt-4">{t('thankyou.contact_us')}</Link>
          <Link to="/about" className="hover:text-white transition-colors text-gray-300 mt-4">{t('thankyou.about_us')}</Link>
          <Link to="/newsletter" className="hover:text-white transition-colors text-gray-300 mt-4">{t('thankyou.newsletter')}</Link>
          <Link to="/faqs" className="hover:text-white transition-colors text-gray-300 mt-4">{t('thankyou.faqs')}</Link>
          <Link to="/privacy" className="hover:text-white transition-colors text-gray-300 mt-4">{t('thankyou.privacy_policy')}</Link>
          <Link to="/terms" className="hover:text-white transition-colors text-gray-300 mt-4">{t('thankyou.terms')}</Link>
        </nav>
        <p className="text-center text-xs text-gray-300 mt-4">{t('thankyou.copyright')}</p>
      </footer>
    </div>
  )
}
