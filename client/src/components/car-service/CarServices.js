import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CarServices extends Component {
  render() {
    return (
      <div>
        Car-service
        <hr />
        <Link to="/car-service-type" className="btn btn-outline-secondary">Service type</Link>
        <Link to="/car-service-interval" className="btn btn-outline-secondary ml-2">Service interval</Link>
      </div>
    );
  }
};

export default CarServices;