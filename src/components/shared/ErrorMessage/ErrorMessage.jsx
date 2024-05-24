import React from 'react';
import PropTypes from 'prop-types';
import { Err } from './ErrorMessage.styles';

const ErrorMessage = ({ content, onClick }) => (
  <Err className="err-msg" onClick={onClick}>
    {content}
  </Err>
);

ErrorMessage.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ErrorMessage;
