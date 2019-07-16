import React from 'react';

import spinner from '../resources/spinner.svg';
import "../css/LoadingMessage.css"

/**
 * Just to display a loading message and a spinner for async requests
 */
class LoadingMessage extends React.Component {
  render() {
    return (
      <div className="LoadingMessage">
        <p className="Loading-message">{this.props.message}</p>
        <img src={spinner} className="Loading-spinner" alt="spinner" />
      </div>
    );
  }
}

export default LoadingMessage;
