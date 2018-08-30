import React from 'react';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';

const EquipmentAttribute = (props) => (
  <div className="container">
    <TextFieldGroup
      name="equipmentname"
      placeholder="Equipment attribute"
      value={props.name}
      onChange={props.onChange}
      error={props.error}
    />
  </div>
);

EquipmentAttribute.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default EquipmentAttribute;