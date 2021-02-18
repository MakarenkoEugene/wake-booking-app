import { makeAutoObservable } from 'mobx';
import { http } from '@libs/http';

export default class SettingsStore {
  users = null;

  data = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.update = this.update.bind(this);

    makeAutoObservable(this);
  }

  async fetch() {
    const [users, settings] = await Promise.all([
      http.get('api/users'),
      http.get('api/settings'),
    ]);

    this.setSettings(settings, users);
  }

  async update(data) {
    await http.post('api/settings', data);

    this.rootStore.ui.showAlert({
      type: 'success',
      msg: 'Successfully saved!',
      delay: 1500,
    });
  }

  setSettings(settings, users) {
    this.data = settings;
    this.users = users.sort((a, b) => (a.username > b.username ? 1 : -1));
  }
}
