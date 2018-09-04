import _ from 'lodash';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Embeds extends Component {
  componentWillMount() {
    this.props.store.filter.fillEmbeds(this.props.embeds);
  }

  render() {
    const { onCheck, embeds } = this.props.store.filter;
    const renderIncludes = _.map(embeds, embed => (
      <div className="form-check  w-25" key={embed.name}>
        <input
          type="checkbox"
          className="form-check-input"
          name={embed.name}
          value={embed.value}
          checked={embed.value}
          onChange={onCheck}
          id="current"
        />
        <label htmlFor="current" className="form-check-label">
          {embed.label}
        </label>
      </div>
    ));
    return (
      <div className="border form-inline w-50">
        {renderIncludes}
      </div>
    );
  }
};

export default Embeds;