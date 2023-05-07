import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { fetchApi } from '../../utils/fetchApi';
import ProductDetailsPage from './ProductDetailsPage';

// mocks the value from fetchApi fn
jest.mock('../../utils/fetchApi');
describe('ProductDetailsPage', () => {
  it('Test the Name, Description, Price after discount, total reviews', async () => {
    // prepare the mock product list
    const mockProductsList = {
      id: 9,
      name: 'MY NEWBORN',
      description: 'My Newborn Baby Mittens Caps Gloves and Booty Combo Set',
      imageUrl: '../assets/images/newborn-caps-and-gloves.jpg',
      thumbnailUrl: 'http://placehold.jp/3d4070/ffffff/150x150.png?text=Apple%20MacBook%20Pro%20M2',
      imgAltText: 'Baby Mittens Caps Gloves',
      maxRetailPrice: 86542,
      category: 'Kids',
      discountApplicable: 15,
      added: '4/9/2021',
      quantity: 30,
      bestSellerRanking: 9,
      featured: true,
      reviews: []
    };
    // mockResolvedValue will compare the fetch api req with the mockProductsList
    fetchApi.mockResolvedValue(mockProductsList);
    // render the ProductDetailsPage component
    render(
      <HashRouter>
        <ProductDetailsPage />
      </HashRouter>
    );

    // Find by Name text and expect to be in the document
    const name = await screen.findByText('MY NEWBORN');
    expect(name).toBeInTheDocument();

    // Find by description text and expect to be in the document
    const description = await screen.findByText(
      'My Newborn Baby Mittens Caps Gloves and Booty Combo Set'
    );
    expect(description).toBeInTheDocument();

    // Find by discount and expect to be in the document
    const discount = await screen.findByText(/Discount of 15 %/i);
    expect(discount).toBeInTheDocument();

    // Find by Price after discount and expect to be in the document
    const price = 86542 - (86542 * 15) / 100;
    const discountPrice = await screen.findByText('Rs. ' + price);
    expect(discountPrice).toBeInTheDocument();

    // Find by Total reviews and expect to be in the document
    const totalreviews = await screen.findByText('Total Reviews 0');
    expect(totalreviews).toBeInTheDocument();
  });

  it('[Mocking] : rendere Error via rest api calls', async () => {
    // prepare the mock error
    const error = 'Error Occured';
    // reject http req with the above error
    fetchApi.mockRejectedValue(error);
    // render the ProductDetailsPage component
    render(
      <HashRouter>
        <ProductDetailsPage />
      </HashRouter>
    );
    // Assert
    const errorMsg = await screen.findByText('Some Error Occured ! Try again Later');
    expect(errorMsg).toBeInTheDocument();
  });
});
