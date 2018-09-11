import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import RemoveButton from '../../common/RemoveButton';
import EditButton from '../../common/EditButton';

const ServiceIntervalListItem = ({ interval, showModal, history }) => (
  <div key={interval.id}
    className="row bg-light border-bottom border-secondary text-dark p-1">
    <span className="col-md-3 text-center">{interval.maximumMileage}</span>
    {
      !_.isEmpty(interval.vehicleModel)
        ? <span className="col-md-3 text-center">{interval.vehicleModel.name} - {interval.vehicleModel.year}</span>
        : <span className="col-md-3 text-center"></span>
    }
    {
      !_.isEmpty(interval.serviceType)
        ? <span className="col-md-3 text-center">({interval.serviceType.name})</span>
        : <span className="col-md-3 text-center"></span>
    }
    <span className="col-md-3 text-center">
      <RemoveButton onClick={() => showModal(interval)} />
      <EditButton onClick={() => history.push(`car-service-interval/${interval.id}`)} />
    </span>
    <hr />
  </div>
);

ServiceIntervalListItem.propTypes = {
  interval: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default ServiceIntervalListItem;