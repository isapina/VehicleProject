import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import ServiceIntervalList from './ServiceIntervalList';
import Spinner from '../../common/Spinner';
import Sorting from '../../filter/Sorting';
import Embeds from '../../filter/Embeds';
import SearchBox from '../../search-box/SearchBox';
import serviceIntervalSortingOptions from './serviceIntervalSortingOptions';
import serviceIntervalEmbeds from './serviceIntervalEmbeds';

@inject('store')
@observer
class ServiceIntervals extends Component {
  state = {
    toggleFilters: true
  }

  componentWillMount() {
    this.props.store.serviceInterval.refreshStateToInitialValue();
  }

  toggleFilters = () => {
    this.setState(prevState => ({ toggleFilters: !prevState.toggleFilters }))
  }

  render() {
    const { pathname } = this.props.location
    const { serviceInterval } = this.props.store;
    let renderList;
    if (serviceInterval.loading) {
      renderList = <Spinner />
    }
    if (serviceInterval.serviceIntervals === null) {
      renderList = '';
    }
    else if (serviceInterval.serviceIntervals.length > 0) {
      renderList = (
        <ServiceIntervalList
          intervals={serviceInterval.serviceIntervals}
          onRemoveServiceInterval={serviceInterval.onRemoveServiceInterval}
          onSelect={serviceInterval.onSelect}
        />)
    }
    else {
      renderList = <p>Sorry, we couldn't find any result(s) matching.</p>
    }

    const filters = !this.state.toggleFilters
      ? (
        <div className="d-flex inline-flex">
          <Sorting sortingOptions={serviceIntervalSortingOptions} />
          <Embeds embeds={serviceIntervalEmbeds} />
        </div>
      )
      : '';

    const showHideFilters = !this.state.toggleFilters ? "Hide filters" : "Show filters"

    return (
      <div>
        <h3 className="text-center">Service intervals</h3>
        <hr />
        <SearchBox
          placeholder="Search by Name or Description..."
          onSearch={serviceInterval.find}
        />
        <button name="toggleFilters" type="button" className="btn btn-outline-secondary mb-1" onClick={this.toggleFilters}>{showHideFilters}</button>
        {filters}
        {renderList}
        <hr />
        <Link
          to={`${pathname}/add`}
          className="btn btn-info  d-inline mr-4"
        >Add service interval</Link>
      </div>
    );
  }
};

export default ServiceIntervals;