import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import History from './History';

describe('History', () => {
  it('Test the Heading of History to be vikz vlothing', () => {
    render(
      <HashRouter>
        <History />
      </HashRouter>
    );
    const historyText = screen.getByTestId('historyText');
    expect(historyText).toHaveTextContent('Vikz Clothing');
  });
});
