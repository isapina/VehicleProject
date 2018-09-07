import React from 'react';
import PropTypes from 'prop-types';

const CancelButton = ({ onClick }) => (
  <button
    className="btn btn-outline-success"
    onClick={onClick}
  > Cancel
  </button>
);

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default CancelButton;