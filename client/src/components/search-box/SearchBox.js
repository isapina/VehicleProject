import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('store')
@observer
class SearchBox extends Component {
  componentWillUnmount() {
    this.props.store.search.clear();
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.props.onSearch();
    }
  }

  render() {
    const { searchTerm, onChange } = this.props.store.search;
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={this.props.placeholder}
          value={searchTerm}
          name="searchTerm"
          onChange={onChange}
          onKeyPress={this.handleKeyPress}
        />
        <div >
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={this.props.onSearch}
          >Search...</button>
        </div>
      </div>
    );
  }
};

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

export default SearchBox;