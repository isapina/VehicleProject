import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ServiceIntervals extends Component {
  render() {
    return (
      <div>
        <div className="row m-1">
          <Link
            to="/car-service"
            className="btn btn-light col-sm-2"
          >
            <i className="fas fa-chevron-left"></i> Go back
        </Link>
          <h3 className="col-sm-10"> Service-intervals</h3>
        </div>
      </div>
    );
  }
};

export default ServiceIntervals;