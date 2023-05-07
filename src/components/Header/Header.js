import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Header.scss'
import { NavLink } from 'react-router-dom';
import MenuList from '../MenuList/MenuList';

const Header = () => {
  return (
    <header className='mx-3 p-3 bg-dark fixed-top text-white'>
      <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
        {/* Rediret to home page */}
        <NavLink
          to='/'
          data-testid='logoHeading'
          className='d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none'>
          Vikz Clothing
        </NavLink>
        <div className='col-md-11 d-flex justify-content-end'>
          <form className='col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3'>
            <div className='input-group col-md-4'>
              <div className='input-group-append bg-white search-icon'>
                <button className='btn btn-outline-secondary border-0 my-1' type='button'>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <input
                className='form-control border-0 border search-bar'
                type='search'
                defaultValue='search'
                id='example-search-input'
              />
            </div>
          </form>
          {/* Renderes the MenuList items */}
          <MenuList />
        </div>
      </div>
    </header>
  );
};

export default Header;
