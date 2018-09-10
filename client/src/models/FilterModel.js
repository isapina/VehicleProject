import _ from 'lodash';
import { observable, computed } from 'mobx';

export class FilterModel {
  @observable searchTerm = '';
  @observable orderBy = '';
  @observable ascending = true;
  @observable pageNumber = null;
  @observable pageSize = null;

  @observable embeds = [];

  @computed
  get queryString() {
    return `searchTerm=${this.searchTerm}&embeds=${this.embedsCSV}&ascending=${this.ascending}&orderBy=${this.orderBy}&pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`;
  }

  @computed
  get embedsCSV() {
    const include = _.map(_.filter(this.embeds, embed => embed.value === true), item => item.name);
    return include.join(',');
  }
}