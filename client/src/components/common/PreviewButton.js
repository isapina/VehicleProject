import React from 'react';
import PropTypes from 'prop-types';

const PreviewButton = ({ onClick }) => (
  <button
    type="button"
    className="btn btn-outline-primary btn-sm mr-2"
    onClick={onClick}
  > Preview
  </button>
);

PreviewButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default PreviewButton;