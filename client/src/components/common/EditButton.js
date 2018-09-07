import React from 'react';
import PropTypes from 'prop-types';

const EditButton = ({ onClick }) => (
  <button
    type="button"
    className="btn btn-outline-info btn-sm ml-2"
    onClick={onClick}
  > Edit
  </button>
);

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default EditButton;