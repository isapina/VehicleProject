import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CarService extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div>
        CarService
        <hr />
        <Link
          to={`${pathname}/add`}
          className="btn btn-info  d-inline mr-4"
        >Add service type</Link>
      </div>
    );
  }
};

export default CarService;