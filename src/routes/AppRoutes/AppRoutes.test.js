import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutUsPage from '../../pages/AboutUsPage/AboutUsPage';
import ContactUsPage from '../../pages/ContactUsPage/ContactUsPage';
import HomePage from '../../pages/HomePage/HomePage';
import ProductsPage from '../../pages/ProductsPage/ProductsPage';
import AppRoutes from './AppRoutes';

describe('AppRoutes', () => {
  // homepage routing
  it('Test the homepage Routing', () => {
    // render the HomePage component
    render(
      // Memory router keeps track of the url like history
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Assert
    expect(<HomePage/>).toBeTruthy();
  });

  // Products routing
  it('Test the products Routing', () => {
    // render the productPage component
    render(
      // Memory router keeps track of the url like history
      <MemoryRouter initialEntries={['/products']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Assert
    expect(<ProductsPage/>).toBeTruthy();
  });

  // ContactUs routing
  it('Test the ContactUs Routing', () => {
    // render the ContactUsPage component
    render(
      // Memory router keeps track of the url like history
      <MemoryRouter initialEntries={['/contact-us']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Assert
    expect(<ContactUsPage />).toBeTruthy();
  });

  // AboutUs routing
  it('Test the AboutUs Routing', () => {
    // render the AboutUsPage component
    render(
      // Memory router keeps track of the url like history
      <MemoryRouter initialEntries={['/about-us']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Assert
    expect(<AboutUsPage />).toBeTruthy();
  });
});
