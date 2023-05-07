import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('Test the logo for the header', () => {
    // render the Header components
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );

    const logo = screen.getByText('Vikz Clothing');
    // Assert
    expect(logo).toBeInTheDocument();
  });

  it('Test the url link for the logo', () => {
    // renders the MenuItem components
    render(
      <HashRouter>
        <Header />
      </HashRouter>
    );
    const logoHeading = screen.getByTestId('logoHeading');
    // Assert
    expect(logoHeading).toHaveAttribute('href', '#/')
  });
});
