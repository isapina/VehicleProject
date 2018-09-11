import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import RemoveButton from '../common/RemoveButton';
import EditButton from '../common/EditButton';

const AdditionalEquipmentListItem = ({ equipment, history, showModal, onSelect }) => (
  <tr >
    <td>{equipment.name}</td>
    <td style={{ maxWidth: '700px' }}>{equipment.description}</td>
    <td>
      {
        _.map(equipment.equipmentAttributes, attr => (
          <div key={attr.id}>
            <span>{attr.name}</span>
          </div>
        ))
      }
    </td>
    <td>
      <RemoveButton onClick={() => showModal(equipment)} />
      <EditButton onClick={() => onSelect(equipment.id, history)} />
    </td>
  </tr>
);

AdditionalEquipmentListItem.propTypes = {
  equipment: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default AdditionalEquipmentListItem;