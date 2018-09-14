import _ from 'lodash';
import { observable, action } from 'mobx';

import Filter from '../models/Filter';

class FilterStore {
  @observable filter = new Filter();

  @action
  onChange = (e) => {
    this.filter[e.target.name] = e.target.value;
  }

  @action
  onCheck = (e) => {
    const item = _.find(this.filter.embeds, { name: e.target.name });
    item.value = !item.value;
    _.replace(this.filter.embeds, embed => embed.name === item.name);
  }

  @action
  fillEmbeds = (data) => {
    this.filter.embeds = data;
  }
}

const filterStore = new FilterStore();

export default filterStore;
