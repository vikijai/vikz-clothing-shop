import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError (error) {
    console.log(error);
    return {
      hasError: true
    }
  }

  componentDidCatch (error, errorInfo) {
    console.log(error);
    console.log(errorInfo)
  }

  render () {
    if (this.state.hasError) {
      return (
        <div className='alert alert-danger'>
          <h2>Some Error Occured</h2>
          <p>Try again later! If the error persist please contact the Admin </p>
        </div>
      )
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element
}

export default ErrorBoundary;
