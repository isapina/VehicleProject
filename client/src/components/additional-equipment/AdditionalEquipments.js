import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import AdditionalEquipmentList from './AdditionalEquipmentList';
import Spinner from '../common/Spinner';

@inject('store')
@observer
class AdditionalEquipments extends Component {
  componentDidMount() {
    this.props.store.equipments.fetchData();
  }

  render() {
    const { pathname } = this.props.location
    const { additionalEquipments, onRemoveAdditionalEquipment, onSelect } = this.props.store.equipments;
    return (
      <div>
        <div className="mx-auto ">
          <Link
            to={`${pathname}/add`}
            className="btn btn-info  d-inline mr-4"
          >Add additional equipment</Link>
        </div>
        {
          additionalEquipments.length > 0
            ? (
              <AdditionalEquipmentList
                equipments={additionalEquipments}
                onRemoveAdditionalEquipment={onRemoveAdditionalEquipment}
                onSelect={onSelect}
              />
            )
            : <Spinner />
        }

      </div>
    );
  }
};

export default AdditionalEquipments;