import React from 'react';
import PropTypes from 'prop-types';

const ServiceTypeCheckbox = ({
  name,
  value,
  onCheck,
  label,
  disabled
}) => (
    <div className="custom-control custom-checkbox  w-50  d-flex justify-content-start" >
      <input
        type="checkbox"
        className="custom-control-input"
        name={name}
        value={value}
        checked={value}
        onChange={onCheck}
        id={name}
        disabled={disabled}
      />
      <label htmlFor={name} className="custom-control-label">
        {label}
      </label>
    </div>
  );

ServiceTypeCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

export default ServiceTypeCheckbox;