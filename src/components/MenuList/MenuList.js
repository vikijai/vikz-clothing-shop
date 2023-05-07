import React from 'react';
import MenuItem from './MenuItem/MenuItem';
import './MenuList.scss'

const MenuList = () => {
  const navItems = [
    {
      id: 1,
      title: 'Home',
      url: '/'
    },
    {
      id: 2,
      title: 'Products',
      url: '/products'
    },
    {
      id: 3,
      title: 'About',
      url: '/about-us'
    },
    {
      id: 4,
      title: 'Contact',
      url: '/contact-us'
    }
  ];

  return (
    <ul data-testid='menuList' className='nav flex-row navItem-parent'>
      {/* send Navitems array to ManuItem components as props */}
      {navItems.map((menu) => {
        return <MenuItem key={menu.id} {...menu} />;
      })}
    </ul>
  );
};

export default MenuList;
