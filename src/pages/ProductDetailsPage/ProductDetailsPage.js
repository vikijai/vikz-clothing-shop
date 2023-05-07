import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { fetchApi } from '../../utils/fetchApi';
import './ProductDetailsPage.scss';
import HelmetSetup from '../../components/HelmetSetup/HelmetSetup';

const ProductDetails = () => {
  const { register, handleSubmit, reset } = useForm();
  // useparm will return key value pairs from the url
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  // calculation of discountPrice
  const price =
    product.maxRetailPrice - (product.maxRetailPrice * product.discountApplicable) / 100;

  useEffect(() => {
    // Fetches the data from db.json based on the id given
    fetchApi(`http://localhost:5000/products/${id}`, 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setProduct(resInJson);
          setIsError(false);
        } else {
          setProduct([]);
          setIsError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // handleChangeRating will setThe rating based on the user changes
  const handleChangeRating = (newRating) => {
    setRating(newRating);
  };

  const submitReview = (reviews) => {
    reviews.rating = rating;
    // create a dublicateReview and assign product reviews
    const duplicateReview = [...product.reviews];
    // filter array will get all the emails in product.review db.json file
    const emails = duplicateReview.filter((rev) => reviews.email === rev.email);
    // only if there is no mail match then below condition works and add the review else reviews already submitted
    if (emails.length === 0) {
      product.reviews.push(reviews);
      fetchApi(`http://localhost:6000/products/${id}`, 'PUT', { ...product })
        .then((resInJson) => {
          if (resInJson.statusCode !== 404) {
            console.log('success');
            setIsSaved(true);
            setTimeout(() => {
              setIsSaved(false);
            }, 3000);
          } else {
            setIsError(true);
            console.log('failure');
          }
        })
        .catch(() => {
          setIsError(true);
          setTimeout(() => {
            setIsError(true);
          }, 3000);
        })
        .finally(() => {
          setIsLoading(false);
          reset({
            name: '',
            email: '',
            phone: '',
            rating: '',
            review: ''
          });
        });
    } else {
      alert('Review Already Submitted');
      reset({
        name: '',
        email: '',
        phone: '',
        rating: '',
        review: ''
      });
    }
  };

  // While initial load the page render with spinning border
  if (isLoading) {
    return <div className='spinner-border text-success'></div>;
  }

  // If the useEffect throws any error return alert-danger
  if (isError) {
    return (
      <div style={{ margin: '80px 10px ' }} className='alert alert-danger'>
        Some Error Occured ! Try again Later
      </div>
    );
  }

  return (
    <>
      <HelmetSetup title='ProductDetails' />
      {/* Fetches the productDetails based on id and render on screen */}
      <div className='row border border-dark product-parent'>
        <div className='row'>
          <Link to='/products'>Back</Link>
        </div>
        <div className='col-md-6'>
          <div className='mx-5'>
            <img
              src={product.imageUrl}
              className='card-img-top product-detail-image'
              alt={product.imgAltText}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <h5 className='card-title'>{product.name}</h5>
          <p className='card-text'>{product.description}</p>
          <p className='m-0'>
            Discount of {product.discountApplicable} % <s>{product.maxRetailPrice}</s>
          </p>
          <h6>Rs. {price}</h6>
          <a href='/' className='btn btn-primary w-100'>
            Add To Cart
          </a>
          <div className='mt-3'>
            <p data-testid='totalReviews' className='d-inline'>
              {/* if reviews is empty fetches from db.json else from reviews array */}
              Total Reviews {product.reviews.length !== 0 ? product.reviews.length : '0'}
            </p>
            <button
              type='button'
              data-bs-toggle='modal'
              data-bs-target='#exampleModal'
              data-bs-whatever='@mdo'
              className='btn btn-primary ms-5'>
              write a Review
            </button>

            {/* Render the reviews after submit */}
            <div className='mt-2'>
              {/* if reviews is empty fetches Productrevievs from db.json else from reviews array */}
              {product.reviews.length !== 0
                ? product.reviews.map((review) => {
                  return (
                      <div className='bg-secondary rounded w-75 row my-3' key={review.email}>
                        <div className='col-md-2 mt-2'>
                          <img
                            className='rounded-circle'
                            src={`https://ui-avatars.com/api/image.png?name=${review.name.substring(
                              0,
                              1
                            )}&background=adb5bd&color=fff`}
                            alt={product.imgAltText}
                          />
                        </div>
                        <div className='text-white mx-1 col-md-7 p-1'>
                          <h6 id='name' className='p-0 m-0'>
                            {review.name}
                          </h6>

                          <p id='email' className='p-0 m-0'>
                            {review.email}
                          </p>

                          <p id='rating' className='p-0 m-0'>
                            Rating: {review.rating}
                          </p>

                          <p id='review' className='p-0 m-0'>
                            {review.review}
                          </p>
                        </div>
                      </div>
                  );
                })
                : ''}
            </div>

            {/* Reviews form Begins */}
            <div
              className='modal fade'
              id='exampleModal'
              tabIndex={-1}
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalLabel'>
                      Write a Review
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    />
                  </div>
                  <div className='modal-body'>
                    <form onSubmit={handleSubmit(submitReview)}>
                      <div className='mb-3 row'>
                        <label htmlFor='recipient-name' className='col-md-2'>
                          Name:
                        </label>
                        <input
                          id='recipient-name'
                          type='text'
                          className='col-md-9'
                          {...register('name', { required: true })}
                        />
                      </div>
                      <div className='mb-3 row'>
                        <label htmlFor='recipient-email' className='col-md-2'>
                          Email:
                        </label>
                        <input
                          id='recipient-email'
                          type='text'
                          className='col-md-9'
                          {...register('email', { required: true })}
                        />
                      </div>
                      <div className='mb-3 row'>
                        <label htmlFor='recipient-phone' className='col-md-2'>
                          Phone:
                        </label>
                        <input
                          id='recipient-phone'
                          type='text'
                          className='col-md-9'
                          {...register('phone', { required: true })}
                        />
                      </div>
                      <div className='mb-3 row'>
                        <label htmlFor='recipient-name' className='col-md-2'>
                          Rating:
                        </label>
                        <div className='col-md-6 p-0'>
                          <StarRatings
                            rating={rating}
                            starRatedColor='Yellow'
                            changeRating={handleChangeRating}
                            starDimension='25px'
                            starSpacing='15px'
                            numberOfStars={5}
                            name='rating'
                            id='recipient-name'
                            {...register('rating')}
                          />
                        </div>
                      </div>
                      <div className='mb-3 row'>
                        <label htmlFor='message-text' className='col-md-2'>
                          Review:
                        </label>
                        <textarea
                          id='message-text'
                          type='text'
                          className='col-md-9'
                          {...register('review', { required: 'Message is required' })}
                        />
                      </div>
                      <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                          Cancel
                        </button>
                        <input className='btn btn-primary my-3' type='submit' />
                      </div>
                      {isSaved ? (
                        <div data-testid='formSuccess' className='alert alert-success my-2 py-2'>
                          Saved Successfully
                        </div>
                      ) : (
                        ''
                      )}
                      {isError ? (
                        <div data-testid='formFailure' className='alert alert-danger my-2 py-2'>
                          Some error Occured! Try again later
                        </div>
                      ) : (
                        ''
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Review form Ends */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
