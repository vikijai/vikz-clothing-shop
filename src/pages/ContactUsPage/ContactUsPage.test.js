import { render, screen } from '@testing-library/react';
// import { HashRouter } from 'react-router-dom';
import { fetchApi } from '../../utils/fetchApi';
import ContactUsPage from './ContactUsPage';

// mocks the value from fetchApi fn
jest.mock('../../utils/fetchApi');
describe('contactUsPage fetch', () => {
  it('[Mocking] : fetchs contact via rest api calls', async () => {
    // prepare the mock api
    const mockUserList = {
      address: '280 ParK Avenue Z,Cross cut Complex, Bangalore, India',
      phone: ['(91) 987 654 3210 ', '(91) 987 654 3211 '],
      email: 'contact@vikzclothing.com'
    };

    fetchApi.mockResolvedValue(mockUserList);
    // render the contactUspage components
    render(<ContactUsPage />);

    const contactAddress = await screen.findByText(
      '280 ParK Avenue Z,Cross cut Complex, Bangalore, India'
    );
    expect(contactAddress).toBeInTheDocument();

    const contactPhone = await screen.findByText('(91) 987 654 3210 (91) 987 654 3211');
    expect(contactPhone).toBeInTheDocument();

    const contactEmail = await screen.findByText('contact@vikzclothing.com');
    expect(contactEmail).toBeInTheDocument();
  });

  it('[Mocking] : rendere Error via rest api calls', async () => {
    // prepare the mock error
    const error = 'Error Occured';
    // reject http req with the above error
    fetchApi.mockRejectedValue(error);
    // render the contactUspage components
    render(<ContactUsPage />);

    const errorMsg = await screen.findByText('Some Error Occured ! Try again Later');
    // Assert
    expect(errorMsg).toBeInTheDocument();
  });
});
