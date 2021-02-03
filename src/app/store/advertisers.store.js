import { makeAutoObservable } from 'mobx';
import { http } from '@libs/http';

export default class AdvertisersStore {
  list = [];

  saving = false;

  loading = false;

  error = null;

  constructor(rootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  async fetch() {
    this.loading = true;
    const advertisers = await http.get('advertisers');

    this.setList(advertisers);
  }

  async save({ _id, ...advertiser }) {
    this.saving = true;

    const { data, ...res } = _id
      ? await http.put(`advertisers/${_id}`, advertiser)
      : await http.post('advertisers', advertiser);

    this.saving = false;

    if (data) {
      if (_id) { // edit
        this.list = this.list.map((a) => {
          if (a._id !== _id) return a;

          return data;
        });
      } else { // add
        this.list = this.list.concat(data);
      }

      this.rootStore.uiStore.showAlert({
        type: 'success',
        msg: `Advertiser "${advertiser.advertiser}" successfully ${_id ? 'saved' : 'added'}`,
        delay: 3000,
      });

      return true;
    }

    // handle error
    const messages = {
      11000: 'Duplicate Advertiser Id',
    };

    this.rootStore.uiStore.showAlert({
      type: 'error',
      msg: messages[res.error.code] || 'Error occurred',
      delay: 3000,
    });

    return false;
  }

  async bulkUpdate(data) {
    this.loading = true;

    const advertisers = await http.post('advertisers/bulk-update', data);
    this.setList(advertisers);
  }

  setList(list) {
    this.loading = false;
    this.list = list;
  }
}
