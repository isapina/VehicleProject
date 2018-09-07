import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const GoBackLink = ({ to }) => (
  <Link
    to={to}
    className="btn btn-light col-sm-2"
  >
    <i className="fas fa-chevron-left"></i> Go back
  </Link>
);

GoBackLink.propTypes = {
  to: PropTypes.string.isRequired
};

export default GoBackLink;