import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class SearchBox extends Component {
  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.props.store.equipment.find(this.props.store.filter.queryString);
    }
  }

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
          onKeyPress={this.handleKeyPress}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => equipment.find(filter.queryString)}
          >Search...</button>
        </div>
      </div>
    );
  }
};

export default SearchBox;