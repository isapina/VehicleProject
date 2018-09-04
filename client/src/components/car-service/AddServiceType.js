import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddServiceType extends Component {
  render() {
    return (
      <div>
        <Link
          to="/car-service"
          className="btn btn-light mb-4"
        >
          <i className="fas fa-chevron-left"></i> Go back
        </Link>
        AddServiceType
      </div>
    );
  }
};

export default AddServiceType;