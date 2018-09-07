import React from 'react';
import PropTypes from 'prop-types';

const RemoveButton = ({ onClick }) => (
  <button
    type="button"
    className="btn btn-outline-danger btn-sm"
    onClick={onClick}
  > Remove
  </button>
);

RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default RemoveButton;