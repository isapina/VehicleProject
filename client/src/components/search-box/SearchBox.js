import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class SearchBox extends Component {
  render() {
    const { equipment, filter } = this.props.store;
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name or description"
          value={filter.searchTerm}
          name="searchTerm"
          onChange={filter.onChange}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={() => equipment.find(filter.queryString)}>Search...</button>
        </div>
      </div>
    );
  }
};

export default SearchBox;