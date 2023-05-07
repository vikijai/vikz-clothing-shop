import { fireEvent, render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
// import { fetchApi } from '../../utils/fetchApi';
import ProductsPage from '../ProductsPage/ProductsPage';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('test the title of the shipping', async () => {
    // render the HomePage component
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );
    // Find by shippingTitle and expect to be in the document
    const shippingTitle = await screen.findByText('FREE SHIPPING & RETURN');
    // Assert
    expect(shippingTitle).toBeInTheDocument();
  });

  it('test the description of the shipping', async () => {
    // render the HomePage component
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );
    // Find by shippingDescription and expect to be in the document
    const shippingDescription = await screen.findByText('Free shipping on all orders over Rs.499.');
    // Assert
    expect(shippingDescription).toBeInTheDocument();
  });

  it('test the className of the description', async () => {
    // render the HomePage component
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );
    // Find by shippingDescriptionClass  and expect to be in the document
    const shippingDescriptionClass = await screen.findAllByTestId('shippingDescription');
    // Assert
    expect(shippingDescriptionClass[0]).toHaveClass('m-0 text-secondary');
  });

  it('test the heading of the products', async () => {
    // render the HomePage component
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );
    // Find by shippingDescriptionClass  and expect to be in the document
    const productHeading = await screen.findByTestId('bestSellerHeading');
    // Assert
    expect(productHeading.textContent).toBe('BestSeller Ranking');
  });

  it('test the view all Btn inside bestseller', async () => {
    // render the HomePage component
    render(
      <HashRouter>
        <HomePage />
      </HashRouter>
    );
    // Find by shippingDescriptionClass  and expect to be in the document
    const productBtn = await screen.findByText('View All');
    // Assert
    expect(productBtn).toBeInTheDocument();
    expect(productBtn).toHaveClass('btn-primary')
    fireEvent.click(productBtn)
    expect(<ProductsPage />).toBeTruthy();
  });
});
