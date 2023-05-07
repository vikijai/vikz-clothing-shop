import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchApi } from '../../../utils/fetchApi';

const ContactUsForm = () => {
  // useForm is hook to manage form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();
  // const [getInTouch, setGetInTouch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const submitForm = (getInTouch) => {
    // setGetInTouch(getInTouch)
    if (getInTouch.length !== 0) {
      fetchApi('http://localhost:5000/getInTouchData', 'POST', getInTouch)
        .then((resInJson) => {
          if (resInJson.statusCode !== 404) {
            console.log('success');
            console.log(resInJson.type);
            setIsSaved(true);
            setTimeout(() => {
              setIsSaved(false);
            }, 3000)
            setIsError(false);
          } else {
            console.log('failure');
            setIsError(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          setTimeout(() => {
            setIsError(true);
          }, 3000)
        })
        .finally(() => {
          setIsLoading(false);
          // reset the form to empty
          reset({
            name: '',
            email: '',
            message: ''
          });
        });
    }
  }

  if (isLoading) {
    return <div className='spinner-border text-success'></div>;
  }

  // If the fetchApi throws any error return alert-danger
  if (isError) {
    return <div data-testid='formFailure' className='alert alert-danger'>Some Error Occured ! Try again Later</div>;
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <label htmlFor='nameInput' className='form-label'>
        Name
      </label>
      <input
        id='nameInput'
        type='text'
        name='name'
        className='form-control'
        {...register('name', { required: true })}
      />
      {errors.name?.type === 'required' && (
        <span className='m-0 d-block' role='alert'>
          Name is required
        </span>
      )}
      <label htmlFor='emailInput' className='form-label mt-3'>
        Email
      </label>
      <input
        id='emailInput'
        type='email'
        name='email'
        className='form-control'
        {...register('email', { required: 'Email Address is required' })}
      />
      {errors.email?.type === 'required' && (
        <p className='m-0' role='alert'>
          Email is required
        </p>
      )}
      <label htmlFor='messageInput' className='form-label mt-3'>
        Message
      </label>
      <textarea
        id='messageInput'
        type='text'
        name='message'
        className='form-control'
        rows='5'
        {...register('message', { required: 'Message is required' })}
      />
      {errors.message?.type === 'required' && (
        <p className='m-0' role='alert'>
          Message is required
        </p>
      )}
      <input data-testid='submitBtn' className='btn btn-primary my-3' type='submit' />
      {/* once after the data is submitted is saved is true */}
      {isSaved ? (
        <div data-testid='formSuccess' className='alert alert-success my-2 py-2'>
          Saved Successfully
        </div>
      ) : (
        ''
      )}
      {isError ? (
        <div data-testid='formFailure' className='alert alert-danger my-2 py-2'>Some error Occured! Try again later</div>
      ) : (
        ''
      )}
    </form>
  );
};

export default ContactUsForm;
