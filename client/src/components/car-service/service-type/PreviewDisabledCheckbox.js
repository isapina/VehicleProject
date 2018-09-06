import React from 'react';
import PropTypes from 'prop-types';

const PreviewDisabledCheckbox = ({ value, label }) => (
  <div className="custom-control custom-checkbox  w-50  d-flex justify-content-start" >
    <input
      type="checkbox"
      className="custom-control-input"
      value={value}
      checked={value}
      id={`${value}`}
      disabled={true}
    />
    <label htmlFor={`${value}`} className="custom-control-label text-light">
      {label}
    </label>
  </div>
);

PreviewDisabledCheckbox.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string.isRequired
}

export default PreviewDisabledCheckbox;