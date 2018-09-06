import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import AdditionalEquipmentList from './AdditionalEquipmentList';
import Spinner from '../common/Spinner';
import Sorting from '../filter/Sorting';
import additionalEquipmentSortingOptions from './additionalEquipmentSortingOptions';
import Embeds from '../filter/Embeds';
import additionalEquipmentEmbeds from './additionalEquipmentEmbeds';
import SearchBox from '../search-box/SearchBox';

@inject('store')
@observer
class AdditionalEquipments extends Component {
  state = {
    toggleFilters: true
  }

  componentWillMount() {
    this.props.store.equipment.refreshStateToInitialValue();
  }

  toggleFilters = () => {
    this.setState(prevState => ({ toggleFilters: !prevState.toggleFilters }))
  }

  render() {
    const { pathname } = this.props.location
    const { equipment } = this.props.store;
    let renderList;
    if (equipment.loading) {
      renderList = <Spinner />
    }
    if (equipment.additionalEquipments === null) {
      renderList = '';
    }
    else if (equipment.additionalEquipments.length > 0) {
      renderList = (
        <AdditionalEquipmentList
          equipments={equipment.additionalEquipments}
          onRemoveAdditionalEquipment={equipment.onRemoveAdditionalEquipment}
          onSelect={equipment.onSelect}
        />)
    }
    else {
      renderList = <p>Sorry, we couldn't find any result(s) matching.</p>
    }

    const filters = !this.state.toggleFilters
      ? (
        <div className="d-flex inline-flex">
          <Sorting sortingOptions={additionalEquipmentSortingOptions} />
          <Embeds embeds={additionalEquipmentEmbeds} />
        </div>
      )
      : '';

    const showHideFilters = !this.state.toggleFilters ? "Hide filters" : "Show filters"

    return (
      <div>
        <h3 className="text-center"> Additional equipment</h3>
        <hr />
        <SearchBox
          placeholder="Search by Name or Description..."
          onSearch={equipment.find}
        />
        <button name="toggleFilters" type="button" className="btn btn-outline-secondary mb-1" onClick={this.toggleFilters}>{showHideFilters}</button>
        {filters}
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