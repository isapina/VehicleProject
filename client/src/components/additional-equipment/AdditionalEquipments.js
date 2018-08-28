import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import AdditionalEquipmentList from './AdditionalEquipmentList';

class AdditionalEquipments extends Component {
  state = {
    additionalEquipments: []
  }

  async componentDidMount() {
    try {
      const url = "/api/additional-equipments?embeds=equipmentattributes";
      const res = await axios.get(url);

      this.setState({ additionalEquipments: res.data.data })
    } catch (error) {
      console.log(error);
    }
  }

  onRemoveAdditionalEquipment = async (id) => {
    try {
      await axios.delete(`/api/additional-equipments/${id}`);
      const newAdditionalEquipments = this.state.additionalEquipments.filter(e => e.id !== id);

      this.setState({ additionalEquipments: newAdditionalEquipments })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { pathname } = this.props.location
    const { additionalEquipments } = this.state;
    return (
      <div>
        <div className="mx-auto ">
          <Link
            to={`${pathname}/add`}
            className="btn btn-info  d-inline mr-4"
          >Add additional equipment</Link>
          <Link
            to={`${pathname}/edit`}
            className="btn btn-secondary  d-inline mr-4"
          >Edit additional equipment</Link>
        </div>
        {
          additionalEquipments.length > 0
            ? (
              <AdditionalEquipmentList
                equipments={additionalEquipments}
                onRemoveAdditionalEquipment={this.onRemoveAdditionalEquipment}
              />
            )
            : ''
        }

      </div>
    );
  }
};

export default AdditionalEquipments;