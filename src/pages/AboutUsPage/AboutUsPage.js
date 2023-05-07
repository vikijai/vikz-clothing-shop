import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import HelmetSetup from '../../components/HelmetSetup/HelmetSetup';
import './AboutUsPage.scss';

const AboutUsPage = () => {
  return (
    <div className='about-parent px-5 h-75 border border-dark'>
      <HelmetSetup title='About Us' />
      <div className='mx-5 px-5 h-75'>
        <div>
          <h3 data-testid='aboutUsHeading'>
            We have the capabilities and experience to deliver the products you need to move forward
          </h3>
        </div>
        <ul className='row'>
          <li className='col-md-3 list-group'>
            <Link
              data-testid='history'
              className='list-group-link text-decoration-none'
              to='history'>
              History
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

export default AboutUsPage;
