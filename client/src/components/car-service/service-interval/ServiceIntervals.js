import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import ServiceIntervalList from './ServiceIntervalList';
import Spinner from '../../common/Spinner';
import Sorting from '../../filter/Sorting';
import Embeds from '../../filter/Embeds';
import SearchBox from '../../search-box/SearchBox';
import serviceIntervalSortingOptions from './serviceIntervalSortingOptions';
import serviceIntervalEmbeds from './serviceIntervalEmbeds';
import GoBackLink from '../../common/GoBackLink';
import AddNewLink from '../../common/AddNewLink';
import ToggleButton from '../../common/ToggleButton';
import TextFieldGroup from '../../common/TextFieldGroup';

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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
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
        <div>
          <div className="d-flex inline-flex">
            <Sorting sortingOptions={serviceIntervalSortingOptions} />
            <Embeds embeds={serviceIntervalEmbeds} />
          </div>
          <div className="w-50 mt-2">
            <TextFieldGroup
              type="number"
              min={0}
              max={500000}
              name="mileageGreaterThanOrEqual"
              placeholder="Greater than"
              value={serviceInterval.mileageGreaterThanOrEqual}
              onChange={serviceInterval.onMileageRangeSet}
              info="Minimum mileage to be included in search. (zero doesn't count)"
            />
            <TextFieldGroup
              type="number"
              min={serviceInterval.mileageGreaterThanOrEqual}
              max={1000000}
              name="mileageLessThanOrEqual"
              placeholder="Less than"
              value={serviceInterval.mileageLessThanOrEqual}
              onChange={serviceInterval.onMileageRangeSet}
              info="Maximum mileage to be included in search. (zero doesn't count)"
            />
          </div>
        </div>
      )
      : '';

    return (
      <div>
        <div className="row m-1">
          <GoBackLink to="/car-service" />
          <h3 className="col-sm-10"> Service-interval</h3>
        </div>
        <hr />
        <SearchBox
          placeholder="Search mileage..."
          onSearch={serviceInterval.find}
        />
        <ToggleButton onClick={this.toggleFilters} value={this.state.toggleFilters} whenOnInfo="Hide filters" whenOffInfo="Show filters" />
        {filters}
        {renderList}
        <hr />
        <AddNewLink info="Add service interval" />
      </div>
    );
  }
};

export default ServiceIntervals;