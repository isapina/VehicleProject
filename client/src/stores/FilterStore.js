import _ from 'lodash';
import { observable, action, computed } from 'mobx';

class FilterStore {
  @observable searchTerm = '';
  @observable orderBy = '';
  @observable ascending = true;
  @observable pageNumber = null;
  @observable pageSize = null;

  @observable embeds = [];

  @action
  onChange = (e) => {
    this[e.target.name] = e.target.value;
  }

  @computed
  get queryString() {
    return `searchTerm=${this.searchTerm}&embeds=${this.embedsCSV}&ascending=${this.ascending}&orderBy=${this.orderBy}&pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`;
  }

  @action
  onCheck = (e) => {
    const item = _.find(this.embeds, { name: e.target.name });
    item.value = !item.value;
    _.replace(this.embeds, embed => embed.name === item.name);
  }

  @action
  fillEmbeds = (data) => {
    this.embeds = data;
  }

  @computed
  get embedsCSV() {
    const include = _.map(_.filter(this.embeds, embed => embed.value === true), item => item.name);
    return include.join(',');
  }
}

const filterStore = new FilterStore();

export default filterStore;
