import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import EquipmentAttribute from './EquipmentAttribute';
import EquipmentAttributeList from './EquipmentAttributeList';
import GoBackLink from '../common/GoBackLink';
import SubmitButton from '../common/SubmitButton';

@inject('store')
@observer
class AddAdditionalEquipment extends Component {
  onSubmit = async (e) => {
    e.preventDefault();
    await this.props.store.equipment.saveAdditionalEquipment(this.props.history);
  }

  render() {
    const {
      additionalEquipment,
      errors,
      onChange,
      removeFromList,
      addNewEquipmentAttribute
    } = this.props.store.equipment;
    const err = !_.isEmpty(errors) && errors;

    return (
      <Fragment>
        <GoBackLink to="/additional-equipment" />
        <form onSubmit={this.onSubmit}>
          <h4>Add Additional Equipment</h4>
          <TextFieldGroup
            name="name"
            placeholder="Name"
            value={additionalEquipment.name}
            onChange={onChange}
            error={err.message || err.name}
          />
          <TextAreaFieldGroup
            placeholder="Additional equipment Description"
            name="description"
            value={additionalEquipment.description}
            onChange={onChange}
            info="Small info about additional equipment"
          />
          <hr />
          <div className="container mb-4">
            <h4>Equipment Attribute</h4>
            <div>
              <EquipmentAttribute
                onChange={onChange}
                name={additionalEquipment.equipmentname}
                description={additionalEquipment.equipmentdescription}
                error={err.equipmentname}
              />
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={addNewEquipmentAttribute}
              >Add to list
            </button>
            </div>
          </div>
          {
            additionalEquipment.equipmentAttributes.length > 0
              ? <EquipmentAttributeList attributes={additionalEquipment.equipmentAttributes} removeFromList={removeFromList} />
              : ''
          }
          <SubmitButton />
        </form>
      </Fragment>
    );
  }
};

export default withRouter(AddAdditionalEquipment);