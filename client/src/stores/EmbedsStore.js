import _ from 'lodash';
import { observable, action, computed } from 'mobx';

class EmbedsStore {
  @observable embeds = [];

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

  @action
  clear = () => {
    this.embeds = [];
  }
}

const embedsStore = new EmbedsStore();

export default embedsStore;
