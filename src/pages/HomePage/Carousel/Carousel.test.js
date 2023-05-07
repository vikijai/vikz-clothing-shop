import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Carousel from './Carousel';

describe('Carousel', () => {
  it('Test the Carousel with the className', () => {
    // render the Carousel component
    render(
      <HashRouter>
        <Carousel />
      </HashRouter>
    );
    // GET by prevBtn and expect class carousel-control-prev to be in the document
    const prevBtn = screen.getByTestId('prevBtn');
    // GET by nextBtn and expect class carousel-control-next to be in the document
    const nextBtn = screen.getByTestId('nextBtn');
    // Assert
    expect(prevBtn).toHaveClass('carousel-control-prev');
    expect(nextBtn).toHaveClass('carousel-control-next');
    expect(prevBtn).toHaveTextContent('Previous');
    expect(nextBtn).toHaveTextContent('Next');
  });
});
