import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import PageNotFound from './PageNotFound';

describe('PageNotFound', () => {
  it('Test the PageNotFound text', () => {
    // render the PageNotFound Component
    render(
      <HashRouter>
        <PageNotFound />
      </HashRouter>
    );
    const errorMsg = screen.getByTestId('errorMsg');
    // Assert
    expect(errorMsg).toHaveTextContent('Sorry 404 Error Occured');

    const redirectToHome = screen.getByText('Go to Home Page')
    // Assert
    expect(redirectToHome).toBeInTheDocument();
  });
});
