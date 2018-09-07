import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const AddNewLink = ({ location, info }) => {
  const { pathname } = location;
  return (
    <Link
      to={`${pathname}/add`}
      className="btn btn-info  d-inline mr-4"
    >{info}
    </Link>
  );
};

export default withRouter(AddNewLink);