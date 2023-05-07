import { PropTypes } from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../HomePage.scss';

// recieves title, description as Props and display in the screen
const CarouselItem = ({ title, description, active, index }) => {
  return (
    <div data-testid='activeCarousel' className={`row carousel-item ${active}`}>
      {/* images are imported from the public assets folder */}
      <img src={`assets/images/carousel${index}.jpg`} className='col-md-5 carousel-img' alt='carouselImg' />
      <div className='col-md-3 d-inline-block '>
        <h5 data-testid='carouselTitle'>{title}</h5>
        <p data-testid='carouselDescription'>{description}</p>
        {/* redirect to products page */}
        <NavLink data-testid='carouselBrowseBtn' to='/products' className='btn btn-primary btn-lg'>
          Browse 1000+ products
        </NavLink>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  title: PropTypes.string,
  active: PropTypes.string,
  description: PropTypes.string,
  index: PropTypes.number
};
export default CarouselItem;
