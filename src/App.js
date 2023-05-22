import { useReducer } from 'react';
import { HashRouter } from 'react-router-dom';

import { CartContext } from './components/contexts/CartContext';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ErrorBoundary from './containers/shared/ErrorBoundary/ErrorBoundary';
import cartReducer from './reducers/cartReducers';
import AppRoutes from './routes/AppRoutes/AppRoutes';

function App() {
  const [cartState, cartDispatch] = useReducer(cartReducer);

  const cart = {
    cartState,
    cartDispatch
  };

  return (
    <div data-testid='app' className='container-fluid p-0'>
      {/* Wrapping Error boundary to all component to avoid Errors */}
      <ErrorBoundary>

        <CartContext.Provider value={cart}>
          <HashRouter>
            <Header />
            <main>
              <AppRoutes />
            </main>
            <Footer />
          </HashRouter>
        </CartContext.Provider>

      </ErrorBoundary>
    </div>
  );
}

export default App;
