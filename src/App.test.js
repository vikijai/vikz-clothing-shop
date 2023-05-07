import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('Test the App component to have the className container-fluid', () => {
    // render the App component
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    const app = screen.getByTestId('app');
    // Assert
    expect(app).toHaveClass('container-fluid p-0');
  });
});
