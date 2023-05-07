import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import CarouselItem from './CarouselItem';

describe('CarouselItem', () => {
  it('Test the CarouselItem title and para', () => {
    // render the CarouselItem component
    render(
      <HashRouter>
        <CarouselItem
          title='Same Day Delivery!'
          description='Some representative placeholder content for the first slide.'
        />
      </HashRouter>
    );
    // GET by carouselTitle and expect Same Day Delivery! to be in the document
    const carouselTitle = screen.getByTestId('carouselTitle');
    // GET by carouselDescription and expect SSome representative placeholder content for the first slide. to be in the document
    const carouselDescription = screen.getByTestId('carouselDescription');

    // Assert
    expect(carouselTitle).toHaveTextContent('Same Day Delivery!');
    expect(carouselDescription.textContent).toBe(
      'Some representative placeholder content for the first slide.'
    );
  });

  it('has the button have the content Browse 1000+ products', () => {
    // render the CarouselItem component
    render(
      <HashRouter>
        <CarouselItem />
      </HashRouter>
    );
    // GET by carouselBrowseBtn and expect Browse 1000+ products to be in the document
    const carouselBrowseBtn = screen.getByTestId('carouselBrowseBtn');
    // Assert
    expect(carouselBrowseBtn.textContent).toBe('Browse 1000+ products');
  });

  it('has the button have the className btn primary', () => {
    // render the CarouselItem component
    render(
      <HashRouter>
        <CarouselItem />
      </HashRouter>
    );
    // GET by carouselBrowseBtn and expect class to have btn btn-primary btn-lg
    const carouselBrowseBtn = screen.getByTestId('carouselBrowseBtn');
    // Assert
    expect(carouselBrowseBtn).toHaveClass('btn btn-primary btn-lg');
  });

  it('has the className active', () => {
    // render the CarouselItem component
    render(
      <HashRouter>
        <CarouselItem active='active'/>
      </HashRouter>
    );
    // GET by carouselBrowseBtn and expect class to have btn btn-primary btn-lg
    const activeCarousel = screen.getByTestId('activeCarousel');
    // Assert
    expect(activeCarousel).toHaveClass('row carousel-item active');
  });

  it('test the props for index', () => {
    // render the CarouselItem component
    render(
      <HashRouter>
        <CarouselItem index={0}/>
      </HashRouter>
    );
    // GET by carouselBrowseBtn and expect class to have btn btn-primary btn-lg
    const carouselImg = screen.getByRole('img');
    expect(carouselImg).toHaveAttribute('src', 'assets/images/carousel0.jpg');
    expect(carouselImg).toHaveAttribute('alt', 'carouselImg');
  });
});
