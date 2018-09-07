import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import Sorting from '../../filter/Sorting';
import Embeds from '../../filter/Embeds';
import SearchBox from '../../search-box/SearchBox';
import serviceTypeEmbeds from './serviceTypeEmbeds';
import serviceTypeSortingOptions from './serviceTypeSortingOptions';
import ServiceTypeList from './ServiceTypeList';
import GoBackLink from '../../common/GoBackLink';

@inject('store')
@observer
class ServiceTypes extends Component {
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
    if (serviceTypes === null) {
      renderList = '';
    }
    else if (serviceTypes.length > 0) {
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
        <div className="row m-1">
          <GoBackLink to="/car-service" />
          <h3 className="col-sm-10"> Service-type</h3>
        </div>
        <SearchBox
          placeholder="Search by Name..."
          onSearch={find}
        />
        <button name="toggleFilters" type="button" className="btn btn-outline-secondary mb-1" onClick={this.toggleFilters}>{showHideFilters}</button>
        {filters}
        {renderList}
        <hr />
        <div className="row">
          <Link
            to={`${pathname}/add`}
            className="btn btn-primary col-md-2 ml-3"
          >Add new service type</Link>
        </div>
      </div>
    );
  }
};

export default ServiceTypes;