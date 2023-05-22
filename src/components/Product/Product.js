import { PropTypes } from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

// recieves via props and render it on screen
const Product = ({ id, name, imageUrl, imgAltText, maxRetailPrice, discountApplicable }) => {
  // calculating the discountPrice
  const price = maxRetailPrice - (maxRetailPrice * discountApplicable) / 100;

  const cart = useContext(CartContext);
  const handleAddToCart = (product) => {
    cart.cartDispatch({
      type: 'ADD_TO_CART',
      payload: product
    });
  };

  return (
    <div className='col-md-3 card mx-4 my-3 p-2'>
      <img src={imageUrl} height='300' className='bg-secondary card-img-top' alt={imgAltText} />
      <div className='card-body'>
        <h5 className='card-title'>
          {/* redirect to productsDetails page */}
          <Link className='text-decoration-none' data-testid='productName' to={`/products/${id}`}>
            {name}
          </Link>
        </h5>
        <p className='m-0'>
          Discount of {discountApplicable} % <s>{maxRetailPrice}</s>
        </p>
        <h6 data-testid='discountPrice'>Rs. {price}</h6>
        <button
          data-testid='addToCart'
          onClick={handleAddToCart.bind(this, {
            id,
            name,
            imageUrl,
            imgAltText,
            maxRetailPrice,
            discountApplicable
          })}
          className='btn btn-primary w-100'>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  imgAltText: PropTypes.string,
  maxRetailPrice: PropTypes.number,
  discountApplicable: PropTypes.number
};

export default Product;
