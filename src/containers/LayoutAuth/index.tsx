import { Link } from 'react-router-dom';
import './index.scss';
import { useVerifyUserInCookies } from '@/utils/hooks/useUser';
import Snow from '@/components/atoms/Snow/snow';

const LayoutAuth = ({ Component }: any) => {
  useVerifyUserInCookies();

  return (
    <div className='layout-auth d-flex justify-content-center'>
      <img
        className='background-img'
        src='https://gambolthemes.net/html-items/cursus-new-demo/images/sign.svg'
        alt='Background Image'
      />
      <div className='auth' style={{ zIndex: 1 }}>
        <div className='container'>
          <div className=''>
            <div className='main-logo'>
              <Link to={'/'}>
                <img
                  src='https://gambolthemes.net/html-items/cursus-new-demo/images/logo.svg'
                  alt=''
                />
              </Link>
            </div>
          </div>
          <div className=''>
            <div className='auth-form'>
              <Component />
            </div>
            <div className='auth-footer'>
              <img
                src='	https://gambolthemes.net/html-items/cursus-new-demo/images/sign_logo.png'
                alt=''
              />
              © 2024 <strong>Cursus</strong> .All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
      <Snow />
    </div>
  );
};

export default LayoutAuth;
