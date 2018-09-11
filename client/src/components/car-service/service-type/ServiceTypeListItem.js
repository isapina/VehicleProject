import React from 'react';
import PropTypes from 'prop-types';

import PreviewButton from '../../common/PreviewButton';
import RemoveButton from '../../common/RemoveButton';
import EditButton from '../../common/EditButton';

const ServiceTypeListItem = ({ serviceType, history, showPreviewModal, showModal }) => (
  <tr className="d-flex justify-content-between">
    <td>{serviceType.name}</td>
    <td>
      <PreviewButton onClick={() => showPreviewModal(serviceType)} />
      <RemoveButton onClick={() => showModal(serviceType)} />
      <EditButton onClick={() => history.push(`car-service-type/${serviceType.id}`)} />
    </td>
  </tr>
);

ServiceTypeListItem.propTypes = {
  serviceType: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  showPreviewModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
}

export default ServiceTypeListItem;