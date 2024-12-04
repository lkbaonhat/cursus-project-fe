import Footer from '@/components/templates/Footer/Footer';
import Header1 from '@/components/templates/Header/Header1';
import '@/layouts/styles/layout.main.scss';
import { selectIntructerProfile, selectStateIsOpen } from '@/modules/global/selector';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { decodeJWT } from '@/utils/hooks/useUser';
import { Sidebar } from '@/components/Sidebar/Sidebar';

const LayoutAdmin = ({ Component }: any) => {
  const isOpen = useSelector(selectStateIsOpen);

  const [widthContent, setWidthContent] = useState(255);
  useEffect(() => {
    if (isOpen) {
      setWidthContent(250);
    } else {
      setWidthContent(0);
    }
  }, [isOpen]);

  /**
   * Check role of user to display sidebar
   */
  const user = useSelector(selectIntructerProfile);

  //----------------------End----------------------//

  return (
    <div className='layout-main'>
      <div className='header'>
        <Header1 />
      </div>

      <div className='main-content'>
        <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
          <Sidebar role={user?.role} />
        </div>
        <div
          className='content'
          style={{ width: `calc(100% - ${widthContent}px)` }}
        >
          <div className='component'>
            <Component />
          </div>
          <div className='footer'>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
