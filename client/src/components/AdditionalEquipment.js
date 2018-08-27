import React, { Component } from 'react';
import axios from '../axios';

import TextFieldGroup from './common/TextFieldGroup';
import TextAreaFieldGroup from './common/TextAreaFieldGroup';

class AdditionalEquipment extends Component {
  state = {
    name: '',
    description: '',
    errors: {}
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const data = [{
      name: this.state.name,
      description: this.state.description
    }];

    try {
      const res = await axios.post('/api/additional-equipments', data);
      this.props.history.push('/');
    } catch (error) {
      this.setState({ errors: error.response.data });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
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

        <input type="submit" className="btn btn-info btn-block mt-4" value="Submit" />
      </form>
    );
  }
};

export default AdditionalEquipment;