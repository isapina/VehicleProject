import React from 'react';
import PropTypes from 'prop-types';

const ToggleButton = ({ value, onClick, whenOnInfo, whenOffInfo }) => {
  const showHideFilters = !value ? whenOnInfo : whenOffInfo

  return (
    <button
      type="button"
      name="toggle"
      className="btn btn-outline-secondary mb-1"
      onClick={onClick}
    >{showHideFilters}
    </button>
  );
};

ToggleButton.propTypes = {
  value: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  whenOnInfo: PropTypes.string.isRequired,
  whenOffInfo: PropTypes.string.isRequired
}

export default ToggleButton;