import React from 'react';
import PropTypes from 'prop-types';

const PreviewDisabledCheckbox = ({ value, label }) => (
  <div className="form-check  w-50  d-flex justify-content-start" >
    <input
      type="checkbox"
      className="form-check-input"
      value={value}
      checked={value}
      id={`${value}`}
      disabled={true}
    />
    <label htmlFor={`${value}`} className="form-check-label text-light">
      {label}
    </label>
  </div>
);

PreviewDisabledCheckbox.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string.isRequired
}

export default PreviewDisabledCheckbox;