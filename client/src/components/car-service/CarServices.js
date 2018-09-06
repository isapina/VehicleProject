import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CarServices extends Component {
  render() {
    return (
      <div>
        <h3 className="text-center">Car service</h3>
        <hr />
        <Link to="/car-service-type" className="btn btn-outline-secondary">Service type</Link>
        <Link to="/car-service-interval" className="btn btn-outline-secondary ml-2">Service interval</Link>
      </div>
    );
  }
};

export default CarServices;