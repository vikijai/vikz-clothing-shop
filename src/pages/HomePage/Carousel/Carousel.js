import React from 'react';
import CarouselItem from './CarouselItem/CarouselItem';

const Carousel = () => {
  // Declare array of carouselItems
  const carouselItems = [
    {
      id: 1,
      title: 'Same Day Delivery!',
      active: 'active',
      description: 'Some representative placeholder content for the first slide.'
    },
    {
      id: 2,
      title: 'Second slide label',
      active: '',
      description: 'Some representative placeholder content for the second slide.'
    },
    {
      id: 3,
      title: 'Third slide label',
      active: '',
      description: 'Some representative placeholder content for the third slide.'
    }
  ];

  return (
    <div id='carouselExampleCaptions' className='carousel slide border border-1 border-dark carousel-parent'>
      <div className='carousel-indicators d-none'>
        <button
          type='button'
          data-bs-target='#carouselExampleCaptions'
          data-bs-slide-to={0}
          className='active'
          aria-current='true'
          aria-label='Slide 1'
        />
        <button
          type='button'
          data-bs-target='#carouselExampleCaptions'
          data-bs-slide-to={1}
          aria-label='Slide 2'
        />
        <button
          type='button'
          data-bs-target='#carouselExampleCaptions'
          data-bs-slide-to={2}
          aria-label='Slide 3'
        />
      </div>

      <div className='carousel-inner'>
        {/* renders the carouselItem to child component sending as props */}
        {carouselItems.map((carousel, index) => {
          return (
            <CarouselItem
              key={carousel.id}
              index={index}
              {...carousel}
            />
          );
        })}
      </div>

      {/* to slide prev button */}
      <button
        data-testid='prevBtn'
        className='carousel-control-prev'
        type='button'
        data-bs-target='#carouselExampleCaptions'
        data-bs-slide='prev'>
        <span className='carousel-control-prev-icon text-dark' aria-hidden='true' />
        <span className='visually-hidden'>Previous</span>
      </button>
      {/* to slide nect button */}
      <button
        data-testid='nextBtn'
        className='carousel-control-next'
        type='button'
        data-bs-target='#carouselExampleCaptions'
        data-bs-slide='next'>
        <span className='carousel-control-next-icon' aria-hidden='true' />
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  );
};

export default Carousel;
