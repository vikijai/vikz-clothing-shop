import React from 'react';
import { Link } from 'react-router-dom';
import HelmetSetup from '../../HelmetSetup/HelmetSetup';
import './PageNotFound.scss'

const PageNotFound = () => {
  return (
    <div className='row border border-dark page-parent'>
      <HelmetSetup title='Page Not Found' />
      <div>
        <h1 data-testid='errorMsg'>Sorry 404 Error Occured</h1>
        <p>We could not find the page </p>
        <Link className='text-decoration-none' to='http://localhost:3000/'>Go to Home Page</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
