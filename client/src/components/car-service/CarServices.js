import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import Sorting from '../filter/Sorting';
import Embeds from '../filter/Embeds';
import SearchBox from '../search-box/SearchBox';
import serviceTypeEmbeds from '../filter/serviceTypeEmbeds';
import serviceTypeSortingOptions from '../filter/serviceTypeSortingOptions';
import ServiceTypeList from './ServiceTypeList';

@inject('store')
@observer
class CarServices extends Component {
  state = {
    toggleFilters: true
  }

  componentDidMount() {
    this.props.store.serviceType.refreshStateToInitialValue();
  }

  loadServiceTypes = async () => {
    await this.props.store.serviceType.find();
  }

  toggleFilters = () => {
    this.setState(prevState => ({ toggleFilters: !prevState.toggleFilters }))
  }

  render() {
    const { pathname } = this.props.location;
    const { serviceTypes, onSelect, onRemoveServiceType, find } = this.props.store.serviceType;
    let renderList;
    if (serviceTypes.length > 0) {
      renderList = (<ServiceTypeList serviceTypes={serviceTypes} onSelect={onSelect} onRemoveServiceType={onRemoveServiceType} />)
    }
    else {
      renderList = <p>Sorry, we couldn't find any result(s) matching.</p>
    }

    const showHideFilters = !this.state.toggleFilters ? "Hide filters" : "Show filters"

    const filters = !this.state.toggleFilters
      ? (
        <div className="d-flex inline-flex">
          <Sorting sortingOptions={serviceTypeSortingOptions} />
          <Embeds embeds={serviceTypeEmbeds} />
        </div>
      )
      : '';

    return (
      <div>
        CarService
        <SearchBox
          placeholder="Search by Name..."
          onSearch={find}
        />
        <button name="toggleFilters" type="button" className="btn btn-outline-secondary mb-1" onClick={this.toggleFilters}>{showHideFilters}</button>
        {filters}
        {renderList}
        <hr />
        <Link
          to={`${pathname}/add`}
          className="btn btn-info  d-inline mr-4"
        >Add service type</Link>
        <hr />
      </div>
    );
  }
};

export default CarServices;