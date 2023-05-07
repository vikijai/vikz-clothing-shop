import React from 'react';
import MenuList from '../MenuList/MenuList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareFacebook,
  faSquareTwitter,
  faInstagram,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const copyrightYear = new Date().getFullYear();
  const developerName = 'Vikz Clothing';

  return (
    <div className='border border-1 bg-dark border-dark m-3 d-flex'>
      {/* Renderes the MenuList items */}
      <MenuList />
      <div className='text-white mx-2 my-1'>
        <FontAwesomeIcon className='p-2' size='xl' icon={faSquareFacebook} />
        <FontAwesomeIcon className='p-2' size='xl' icon={faSquareTwitter} />
        <FontAwesomeIcon className='p-2' size='xl' icon={faInstagram} />
        <FontAwesomeIcon className='p-2' size='xl' icon={faWhatsapp} />
      </div>
      <p style={{ width: '728px' }}className='text-white m-0 px-3 py-2 text-end'>
        Copyright : &copy; {copyrightYear} | {developerName}
      </p>
    </div>
  );
};

export default Footer;
