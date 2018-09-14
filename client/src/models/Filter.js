import _ from 'lodash';
import { observable, computed } from 'mobx';

export default class Filter {
  @observable searchTerm = '';
  @observable orderBy = '';
  @observable ascending = true;

  @observable embeds = [];

  @computed
  get queryString() {
    return `searchTerm=${this.searchTerm}&embeds=${this.embedsCSV}&ascending=${this.ascending}&orderBy=${this.orderBy}`;
  }

  @computed
  get embedsCSV() {
    const include = _.map(_.filter(this.embeds, embed => embed.value === true), item => item.name);
    return include.join(',');
  }
}