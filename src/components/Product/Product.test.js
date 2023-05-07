import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Product from './Product';

describe('Products', () => {
  it('Test the Product Name to be same as db.json', () => {
    // renders the product component
    render(
      <HashRouter>
        <Product name='U.S. POLO ASSN.'/>
      </HashRouter>
    );
    const productName = screen.getByTestId('productName');
    // Assert
    expect(productName).toHaveTextContent('U.S. POLO ASSN.');
  });

  it('has button having text Join cognizant and class btn-primary', () => {
    // renders the product component
    render(
      <HashRouter>
        <Product />
      </HashRouter>
    );
    const addToCart = screen.getByTestId('addToCart');
    // Assert
    expect(addToCart).toHaveClass('btn-primary');
    expect(addToCart.textContent).toBe('Add To Cart');
  });

  it('Test the Price after discount', () => {
    // renders the product component
    render(
      <HashRouter>
        <Product maxRetailPrice={23700} discountApplicable={11} />
      </HashRouter>
    );
    const price = 23700 - (23700 * 11) / 100;
    const discountPrice = screen.getByTestId('discountPrice');
    // Assert
    expect(discountPrice).toHaveTextContent('Rs. ' + price);
  });

  it('Test the image url and alt image', () => {
    // renders the product component
    render(
      <HashRouter>
        <Product imageUrl='../assets/images/polo-shirt.jpg' imgAltText='Fit Cotton Polo' />
      </HashRouter>
    );

    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', '../assets/images/polo-shirt.jpg');
    expect(logo).toHaveAttribute('alt', 'Fit Cotton Polo');
  });
});
