import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import MenuList from './MenuList';

describe('MenuList', () => {
  it('Test the className of ul', () => {
    // renders the MenuItem components
    render(
      <HashRouter>
        <MenuList />
      </HashRouter>
    );
    const menuList = screen.getByTestId('menuList');
    // Assert
    expect(menuList).toHaveClass('nav flex-row navItem-parent');
  });
});
