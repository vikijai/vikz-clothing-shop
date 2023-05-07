import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import MenuItem from './MenuItem';

describe('MenuItems', () => {
  it('Test the Nav item for Home', () => {
    // renders the MenuItem components
    render(
      <HashRouter>
        <MenuItem title='Home' url='/'/>
      </HashRouter>
    );
    const navItem = screen.getByTestId('navItem');
    // Assert
    expect(navItem).toHaveTextContent('Home');
    expect(window.location.pathname).toEqual('/');
  });

  it('Test the Nav item for About Us', () => {
    // Navigate()
    // renders the MenuItem components
    render(
      <HashRouter>
        <MenuItem title='About Us' url='/about-us'/>
      </HashRouter>
    );
    const navItem = screen.getByTestId('navItem');
    // Assert
    expect(navItem).toHaveTextContent('About');
    expect(navItem).toHaveAttribute('href', '#/about-us')
  });

  it('Test the Nav item for contact Us', () => {
    // renders the MenuItem components
    render(
      <HashRouter>
        <MenuItem title='Contact Us' url='/contact-us'/>
      </HashRouter>
    );
    const navItem = screen.getByTestId('navItem');
    // Assert
    expect(navItem).toHaveTextContent('Contact');
    expect(navItem).toHaveAttribute('href', '#/contact-us')
  });

  it('Test the Nav item for Products', () => {
    // renders the MenuItem components
    render(
      <HashRouter>
        <MenuItem title='Products' url='products'/>
      </HashRouter>
    );
    const navItem = screen.getByTestId('navItem');
    // Assert
    expect(navItem).toHaveTextContent('Products');
    expect(navItem).toHaveAttribute('href', '#/products')
  });
});
