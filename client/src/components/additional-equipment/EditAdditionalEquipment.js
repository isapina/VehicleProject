import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import EquipmentAttribute from './EquipmentAttribute';
import EquipmentAttributeList from './EquipmentAttributeList';
import Spinner from '../common/Spinner';

@inject('store')
@observer
class EditAdditionalEquipment extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.store.equipment.loadEquipmentData(id);
  }

  render() {
    const id = this.props.match.params.id;
    const { equipment: store } = this.props.store;
    const renderEditView = store.name === 'undefined' || store.equipmentname === 'undefined'
      ? <Spinner />
      : (
        <form onSubmit={(e) => store.updateAdditionalEquipment(e, id, this.props.history)}>
          <h4>Edit Additional Equipment</h4>
          <TextFieldGroup
            name="name"
            placeholder="Name"
            value={store.name}
            onChange={store.onChange}
            disabled={true}
          />
          <TextAreaFieldGroup
            placeholder="Additional equipment Description"
            name="description"
            value={store.description}
            onChange={store.onChange}
            info="Small info about additional equipment"
            disabled={true}
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
        </form>)

    return (
      <Fragment>
        <Link
          to="/additional-equipment"
          className="btn btn-light mb-4"
        >
          <i className="fas fa-chevron-left"></i> Go back
        </Link>
        {renderEditView}
      </Fragment>
    );
  }
};

export default withRouter(EditAdditionalEquipment);