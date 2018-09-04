import React from 'react';
import PropTypes from 'prop-types';

const ServiceTypeCheckbox = ({
  name,
  value,
  onCheck,
  label
}) => (
    <div className="form-check  w-50  d-flex justify-content-start" >
      <input
        type="checkbox"
        className="form-check-input"
        name={name}
        value={value}
        checked={value}
        onChange={onCheck}
        id={name}
      />
      <label htmlFor={name} className="form-check-label">
        {label}
      </label>
    </div>
  );

ServiceTypeCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default ServiceTypeCheckbox;