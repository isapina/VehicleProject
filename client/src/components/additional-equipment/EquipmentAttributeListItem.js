import React from 'react';
import PropTypes from 'prop-types';

import RemoveButton from '../common/RemoveButton';

const EquipmentAttributeListItem = ({ attribute, removeFromList }) => (
  <tr key={attribute.id}>
    <td>{attribute.name}</td>
    <td>
      <RemoveButton onClick={() => removeFromList(attribute.id)} />
    </td>
  </tr>
);

EquipmentAttributeListItem.propTypes = {
  attribute: PropTypes.object.isRequired,
  removeFromList: PropTypes.func.isRequired
}

export default EquipmentAttributeListItem;