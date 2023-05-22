import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// import component from the respective folder
import ProductsPage from '../../pages/ProductsPage/ProductsPage';
import ProductDetailsPage from '../../pages/ProductDetailsPage/ProductDetailsPage';
import History from '../../pages/AboutUsPage/History/History';
import PageNotFound from '../../components/shared/ErrorPage/PageNotFound';
import CartPage from '../../pages/CartPage/CartPage';

// lazy loading
const HomePage = React.lazy(() => import('../../pages/HomePage/HomePage'));
const AboutUsPage = React.lazy(() => import('../../pages/AboutUsPage/AboutUsPage'));
const ContactUsPage = React.lazy(() => import('../../pages/ContactUsPage/ContactUsPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className='spinner-border text-success'></div>}>
      <Routes>
        {/* Based on the route path Component will be rendered */}
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductDetailsPage />} />
        <Route path='/about-us' element={<AboutUsPage />}>
          {/* Child routing */}
          <Route path='history' element={<History />} />
        </Route>
        <Route path='/contact-us' element={<ContactUsPage />} />
        <Route path='/cart-items' element={<CartPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
