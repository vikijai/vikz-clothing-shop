import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faTruckFast } from '@fortawesome/free-solid-svg-icons';

import Product from '../../components/Product/Product';
import { fetchApi } from '../../utils/fetchApi';
import Carousel from './Carousel/Carousel';
import HelmetSetup from '../../components/HelmetSetup/HelmetSetup';

const HomePage = () => {
  // Declare state
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);
  const shippingDetails = [
    {
      id: 1,
      title: 'FREE SHIPPING & RETURN',
      description: 'Free shipping on all orders over Rs.499.',
      iconName: faTruckFast,
      className: 'car-icon',
      size: '2xl'
    },
    {
      id: 2,
      title: 'MONEY BACK GUARANTEE',
      description: '100% money back guarantee',
      iconName: faDollarSign,
      className: 'border border-dark dollar-icon',
      size: 'xl'
    },
    {
      id: 3,
      title: 'ONLINE SUPPORT 24/7',
      description: 'Reach us Out at anytime',
      iconName: faTruckFast,
      className: 'car-icon',
      size: '2xl'
    }
  ];

  useEffect(() => {
    // fetches the bestseller from thedb.json and setinside the products array
    fetchApi(
      'http://localhost:5000/products?bestSellerRanking=1&bestSellerRanking=2&bestSellerRanking=3&_sort=bestSellerRanking&_order=asc',
      'GET'
    )
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setProducts(resInJson);
          setIsError(false);
        } else {
          setProducts([]);
          setIsError(true);
        }
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // While initial load the page render with spinning border
  if (isLoading) {
    return <div className='spinner-border text-success'></div>;
  }

  // If the useEffect throws any error return alert-danger
  if (isError) {
    return <div className='alert alert-danger'>Some Error Occured ! Try again Later</div>;
  }

  return (
    <>
      <HelmetSetup title='Vikz Clothing' />
      <Carousel />
      <div className='row border border-1 border-dark m-3 justify-content-around'>
        <h3 data-testid='bestSellerHeading' className='flex-start mx-5 px-5'>BestSeller Ranking</h3>
        {/* Renders the Best Seller array in the screen  */}
        {products.map((product, index) => {
          return <Product key={product.id} index={index} {...product} />;
        })}
        <div className='row d-flex justify-content-center my-2'>
          {/* it redirect to products page */}
          <Link to='/products' className='col-md-1 border-0 btn btn-primary btn-sm'>
            View All
          </Link>
        </div>
      </div>

      {/* Shipping Information */}
      <div className='row border border-1 m-3'>
        {/* shipping details is looped inside the array */}
        {shippingDetails.map((shipping) => {
          return (
            <div key={shipping.id} className='col-md-3 mx-5 my-3 p-2'>
              <div className='row'>
                <FontAwesomeIcon
                  className={`col-md-2 ${shipping.className}`}
                  size={shipping.size}
                  icon={shipping.iconName}
                />
                <div className='col-md-9'>
                  <h6 className='m-0'>{shipping.title}</h6>
                  <p data-testid='shippingDescription' className='m-0 text-secondary'>
                    {shipping.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
