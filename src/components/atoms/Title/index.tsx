import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface TitlePagesProps {
  breadcrumbs: BreadcrumbItem[];
  titleName: string;
}

const TitlePages: React.FC<TitlePagesProps> = ({breadcrumbs, titleName }) => {
  return (
    <div className="content-container">
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='title-of-page'>
              <nav className="breadcrumb">
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={index}>
                    <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
                    {index < breadcrumbs.length - 1 && ' / '}
                  </React.Fragment>
                ))}
              </nav>
              <h1 className="title">{titleName}</h1>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default TitlePages;
