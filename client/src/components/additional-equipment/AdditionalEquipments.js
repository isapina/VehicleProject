import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import AdditionalEquipmentList from './AdditionalEquipmentList';
import Spinner from '../common/Spinner';

@inject('store')
@observer
class AdditionalEquipments extends Component {
  componentDidMount() {
    this.props.store.equipment.refreshStateToInitialValue();
    this.props.store.equipment.fetchData();
  }

  // TODO :  filter    --> @observable searchTerm = '';                      default = null;       
  //         sorting   --> @observable orderBy='id || name'                  default = null;
  //         sorting   --> @observable ascending='true || false'             default = null;
  //         embeds    --> @observable embeds='' || 'equipmentattributes'    default = null;
  //         paging    --> @observable pageNumber='';                        default = null;
  //         paging    --> @observable pageSize='';                          default = null;

  render() {
    const { pathname } = this.props.location
    const { equipment: store } = this.props.store;
    const renderList = store.additionalEquipments.length > 0
      ? (
        <AdditionalEquipmentList
          equipments={store.additionalEquipments}
          onRemoveAdditionalEquipment={store.onRemoveAdditionalEquipment}
          onSelect={store.onSelect}
        />
      )
      : <Spinner />

    return (
      <div>
        <div className="mx-auto ">
          <Link
            to={`${pathname}/add`}
            className="btn btn-info  d-inline mr-4"
          >Add additional equipment</Link>
        </div>
        {renderList}
      </div>
    );
  }
};

export default AdditionalEquipments;