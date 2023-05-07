import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// recieves via props and render it on screen
const MenuItem = ({ title, url }) => {
  return (
    <li className='nav-item'>
      {/* Redirects to specific page url */}
      <NavLink data-testid='navItem' to={url} className='nav-link active'>
        {title}
      </NavLink>
    </li>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string
};

export default MenuItem;
