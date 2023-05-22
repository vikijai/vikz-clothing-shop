import React, { useContext } from 'react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../../components/contexts/CartContext';
import './CartPage.scss';

const CartPage = () => {
  const cart = useContext(CartContext);
  const total = cart.cartState?.reduce((total, cart) => {
    return total + cart.maxRetailPrice - (cart.maxRetailPrice * cart.discountApplicable) / 100;
  }, 0);

  return (
    <div className='row border border-dark cart-parent px-5'>
      {cart.cartState?.map((cart) => {
        const price = cart.maxRetailPrice - (cart.maxRetailPrice * cart.discountApplicable) / 100;
        return (
          <div className='row px-5 py-2 mx-5 my-2' key={cart.id}>
            <div className='col-md-2'>
              <img src={cart.imageUrl} height='150' alt={cart.imgAltText} />
            </div>
            <div className='col-md-3 my-4'>
              <h4>{cart.name}</h4>
              <p className='m-0'>
                Discount of {cart.discountApplicable} % <s>{cart.maxRetailPrice}</s>
              </p>
              <h6 data-testid='discountPrice'>Rs. {price}</h6>
            </div>
          </div>
        );
      })}
      {cart.cartState?.length === undefined ? (
        <div className='row'>
          <FontAwesomeIcon className='col-md-2' size='2xl' icon={faCartShopping} />
          <h5 className='col-md-3'>Your Shoping Cart is Empty</h5>
        </div>
      ) : (
        <div className='row total-wrapper'>
          <h4>Total : {Math.ceil(total * 100) / 100}</h4>
        </div>
      )}
    </div>
  );
};

export default CartPage;
