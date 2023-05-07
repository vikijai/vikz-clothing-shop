import { fireEvent, render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import AboutUsPage from './AboutUsPage';

describe('AboutUs', () => {
  it('Test the AboutUs Heading', () => {
    // render the AboutUspage components
    render(
      <HashRouter>
        <AboutUsPage />
      </HashRouter>
    );
    const aboutUsHeading = screen.getByTestId('aboutUsHeading');
    // Assert
    expect(aboutUsHeading).toHaveTextContent(
      'We have the capabilities and experience to deliver the products you need to move forward'
    );
  });

  it('Test the AboutUs child routing', () => {
    // render the AboutUspage components
    render(
      <HashRouter>
        <AboutUsPage />
      </HashRouter>
    );
    const history = screen.getByTestId('history');
    // Assert
    expect(history).toHaveTextContent('History');
    fireEvent.click(history);
    expect(screen.getByText('History')).toBeInTheDocument();
  });
});
