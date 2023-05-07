import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { fetchApi } from '../../utils/fetchApi';
import ProductsPage from './ProductsPage';

// mocks the value from fetchApi fn
jest.mock('../../utils/fetchApi');
describe('ProductsPage', () => {
  it('[Mocking] : fetchs products via rest api calls', async () => {
    // prepare the mock product list
    const mockProductsList = [
      {
        id: 7,
        name: 'Attirezilla',
        description: 'Women Anarkali Kurti | Embroidery On Yoke & Sleeves',
        maxRetailPrice: 65430,
        category: 'Women',
        discountApplicable: 15,
        bestSellerRanking: 1
      },
      {
        id: 4,
        name: 'Van Heusen',
        description:
          'Van Heusen Athleisure Men Shirt - Polyester Rayon Spandex - Zipper Pocket, Super Stretch, Drawstring Waist',
        maxRetailPrice: 87540,
        category: 'Men',
        discountApplicable: 9,
        bestSellerRanking: 2
      },
      {
        id: 5,
        name: 'Aurelia',
        description: 'Women Kurta-Straight Palazzo',
        maxRetailPrice: 78900,
        category: 'Women',
        discountApplicable: 10,
        bestSellerRanking: 3
      }
    ];

    // mockResolvedValue will compare the fetch api req with the mockProductsList
    fetchApi.mockResolvedValue(mockProductsList);
    // render the productPage component
    render(
      <HashRouter>
        <ProductsPage />
      </HashRouter>
    );
    const productTitle = await screen.findAllByText(/Attirezilla/i);
    const productPrice = await screen.findAllByText(/Discount of 15 %/i);
    // Assert
    expect(productTitle[0]).toBeInTheDocument();
    expect(productPrice[0]).toBeInTheDocument();
  });

  it('[Mocking] : render Error via rest api calls', async () => {
    // prepare the mock error
    const error = 'Error Occured';
    // reject http req with the above error
    fetchApi.mockRejectedValue(error);
    // render the productPage component
    render(
      <HashRouter>
        <ProductsPage />
      </HashRouter>
    );
    // Assert
    const errorMsg = await screen.findByText('Some Error Occured ! Try again Later');
    expect(errorMsg).toBeInTheDocument();
  });
});
