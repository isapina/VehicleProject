import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import EquipmentAttribute from './EquipmentAttribute';
import EquipmentAttributeList from './EquipmentAttributeList';

@inject('store')
@observer
class AddAdditionalEquipment extends Component {
  render() {
    const { equipment: store } = this.props.store;
    const err = !_.isEmpty(store.errors) && store.errors;
    return (
      <Fragment>
        <Link
          to="/additional-equipment"
          className="btn btn-light mb-4"
        >
          <i className="fas fa-chevron-left"></i> Go back
        </Link>
        <form onSubmit={(e) => store.saveAdditionalEquipment(e, this.props.history)}>
          <h4>Add Additional Equipment</h4>
          <TextFieldGroup
            name="name"
            placeholder="Name"
            value={store.name}
            onChange={store.onChange}
            error={err.message}
          />
          <TextAreaFieldGroup
            placeholder="Additional equipment Description"
            name="description"
            value={store.description}
            onChange={store.onChange}
            info="Small info about additional equipment"
          />
          <hr />
          <div className="container mb-4">
            <h4>Equipment Attribute</h4>
            <div>
              <EquipmentAttribute
                onChange={store.onChange}
                name={store.equipmentname}
                description={store.equipmentdescription}
              />
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={store.addNewEquipmentAttribute}
              >Add to list
            </button>
            </div>
          </div>
          {store.equipmentAttributes.length > 0 ? <EquipmentAttributeList attributes={store.equipmentAttributes} removeFromList={store.removeFromList} /> : ''}
          <input type="submit" className="btn btn-primary btn-block mt-4" value="Submit" />
        </form>
      </Fragment>
    );
  }
};

export default withRouter(AddAdditionalEquipment);