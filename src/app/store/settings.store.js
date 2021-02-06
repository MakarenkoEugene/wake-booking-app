import { makeAutoObservable } from 'mobx';
import { http } from '@libs/http';

export default class SettingsStore {
  users = null;
  data = null;

  constructor() {
    this.update = this.update.bind(this);

    makeAutoObservable(this);
  }

  async fetch() {
    const [users, settings] = await Promise.all([
      http.get('settings/users'),
      http.get('settings'),
    ]);

    this.setSettings(settings, users);
  }

  update(data) {
    http.post('settings', data);
  }

  setSettings(settings, users) {
    this.data = settings;
    this.users = users.sort((a, b) => a.username > b.username ? 1 : -1);
  }
}
