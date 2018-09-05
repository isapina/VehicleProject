import _ from 'lodash';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Embeds extends Component {
  componentDidMount() {
    this.props.store.filter.fillEmbeds(this.props.embeds);
  }

  render() {
    const { onCheck, embeds } = this.props.store.filter;
    const renderIncludes = _.map(embeds, embed => (
      <div className="form-check  w-50 d-flex justify-content-start" key={embed.name}>
        <input
          type="checkbox"
          className="form-check-input"
          name={embed.name}
          value={embed.value}
          checked={embed.value}
          onChange={onCheck}
          id={embed.name}
        />
        <label htmlFor={embed.name} className="form-check-label">
          {embed.label}
        </label>
      </div>
    ));
    return (
      <div className="border form-inline w-50 p-2">
        {renderIncludes}
      </div>
    );
  }
};

export default Embeds;