import React from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';

const HelmetSetup = ({ title }) => {
  return (
    // Helmet Provider prevents from null components
    <HelmetProvider>
      <Helmet>
        {/* title tag displays the title of the page */}
        <title title='titleName'>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
};

HelmetSetup.propTypes = {
  title: PropTypes.string
}

export default HelmetSetup;
