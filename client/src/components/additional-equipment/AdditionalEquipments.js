import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import AdditionalEquipmentList from './AdditionalEquipmentList';
import Spinner from '../common/Spinner';
import Sorting from '../filter/Sorting';
import sortingOptions from '../filter/sortingOptions';
import Embeds from '../filter/Embeds';
import additionalEquipmentEmbeds from '../filter/additionalEquipmentEmbeds';
import SearchBox from '../search-box/SearchBox';

@inject('store')
@observer
class AdditionalEquipments extends Component {
  componentDidMount() {
    this.props.store.equipment.refreshStateToInitialValue();
  }

  render() {
    const { pathname } = this.props.location
    const { equipment } = this.props.store;
    let renderList;
    if (equipment.loading) {
      renderList = <Spinner />
    }
    if (equipment.additionalEquipments.length > 0) {
      renderList = (<AdditionalEquipmentList
        equipments={equipment.additionalEquipments}
        onRemoveAdditionalEquipment={equipment.onRemoveAdditionalEquipment}
        onSelect={equipment.onSelect}
      />)
    }
    else {
      renderList = <p>Sorry, we couldn't find any result(s) matching.</p>
    }

    return (
      <div>
        <div className="mx-auto ">
          <SearchBox />
          <Sorting sortingOptions={sortingOptions} />
          <Embeds embeds={additionalEquipmentEmbeds} />
        </div>
        {renderList}
        <hr />
        <Link
          to={`${pathname}/add`}
          className="btn btn-info  d-inline mr-4"
        >Add additional equipment</Link>
      </div>
    );
  }
};

export default AdditionalEquipments;