import _ from 'lodash';
import React, { Component } from 'react';
import axios from '../../axios';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import EquipmentAttribute from './EquipmentAttribute';
import EquipmentAttributeList from './EquipmentAttributeList';

class AdditionalEquipment extends Component {
  state = {
    name: '',
    description: '',
    equipmentname: '',
    equipmentAttributes: [],
    errors: {}
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const data = [{
      name: this.state.name,
      description: this.state.description,
      equipmentAttributes: _.map(this.state.equipmentAttributes, _.partialRight(_.pick, 'name'))
    }];

    try {
      await axios.post('/api/additional-equipments', data);
      this.props.history.push('/');
    } catch (error) {
      this.setState({ errors: error.response.data });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  addNewEquipmentAttribute = (equipData, e) => {
    e.preventDefault();

    const newEquipmentAttributes = this.state.equipmentAttributes;
    newEquipmentAttributes.push({ name: equipData.name, key: Math.random() });

    this.setState({
      equipmentAttributes: newEquipmentAttributes,
      equipmentname: '',
    });
  }

  removeFromList = (key) => {
    const newEquipmentAttributes = this.state.equipmentAttributes.filter(e => e.key !== key);
    this.setState({ equipmentAttributes: newEquipmentAttributes });
  }

  render() {
    const { errors, equipmentAttributes } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h4>Additional Equipment</h4>
        <TextFieldGroup
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.onChange}
          error={errors.message}
        />
        <TextAreaFieldGroup
          placeholder="Additional equipment Description"
          name="description"
          value={this.state.description}
          onChange={this.onChange}
          info="Small info about additional equipment"
        />
        <hr />
        <div className="container mb-4">
          <h4>Equipment Attribute</h4>
          <div>
            <EquipmentAttribute
              onChange={this.onChange}
              name={this.state.equipmentname}
              description={this.state.equipmentdescription}
            />
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={(e) => this.addNewEquipmentAttribute({ name: this.state.equipmentname, description: this.state.equipmentdescription }, e)}
            >Add to list
            </button>
          </div>
        </div>
        {equipmentAttributes.length > 0 ? <EquipmentAttributeList attributes={equipmentAttributes} removeFromList={this.removeFromList} /> : ''}
        <input type="submit" className="btn btn-primary btn-block mt-4" value="Submit" />
      </form>
    );
  }
};

export default AdditionalEquipment;