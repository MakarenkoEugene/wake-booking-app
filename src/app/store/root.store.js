import UIStore from '@store/ui.store';
import UserStore from '@store/user.store';
import AdvertisersStore from '@store/advertisers.store';
import SettingsStore from '@store/settings.store';

export default class RootStore {
  constructor() {
    this.ui = new UIStore(this);
    this.user = new UserStore(this);
    this.advertisers = new AdvertisersStore(this);
    this.settings = new SettingsStore(this);
  }
}
