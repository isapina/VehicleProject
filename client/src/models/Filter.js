import _ from 'lodash';
import { observable, computed } from 'mobx';

export default class Filter {
  @observable searchTerm = '';
  @observable orderBy = '';
  @observable ascending = true;


  @computed
  get queryString() {
    return `searchTerm=${this.searchTerm}&embeds=${this.embedsCSV}&ascending=${this.ascending}&orderBy=${this.orderBy}`;
  }
}