import _ from 'lodash';
import React, { Component, Fragment } from 'react';
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
      <div className="form-check mb-4" key={embed.name}>
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
      <Fragment>
        {renderIncludes}
      </Fragment>
    );
  }
};

export default Embeds;