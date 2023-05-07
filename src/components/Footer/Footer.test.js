import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer', () => {
  it('Test the Footer copyright year and name', () => {
    // renders the Footer components
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );

    const copyright = screen.getByText('Copyright : © 2023 | Vikz Clothing');
    // Assert
    expect(copyright).toBeInTheDocument();
  });
});
