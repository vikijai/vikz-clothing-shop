import { faEnvelope, faMap, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import HelmetSetup from '../../components/HelmetSetup/HelmetSetup';
import { fetchApi } from '../../utils/fetchApi';
import ContactUsForm from './ContactUsForm/ContactUsForm';
import './ContactUsPage.scss';

const ContactUsPage = () => {
  // declare state
  const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // fetches the contact data and render it on sreen
    fetchApi('http://localhost:5000/contactData', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          console.log('success');
          setContact(resInJson);
          setIsError(false);
        } else {
          console.log('failure');
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
      <HelmetSetup title='Contact Us' />
      <div className='row border border-dark contact-parent'>
        <div className='col-md-6'>
          <h1>Contact Us</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum
          </p>
          <div className='mx-5 px-5'>
            <div className='row'>
              <FontAwesomeIcon className='col-md-1' icon={faMap} />
              <p className='col-md-8'>{contact.address}</p>
            </div>
            <div className='row'>
              <FontAwesomeIcon className='col-md-1' icon={faPhone} />
              <p className='col-md-4'>{contact.phone}</p>
            </div>
            <div className='row'>
              <FontAwesomeIcon className='col-md-1' icon={faEnvelope} />
              <p className='col-md-5'>{contact.email}</p>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          {/* Form validates store all the data in the getInTouch array */}
          <ContactUsForm/>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
