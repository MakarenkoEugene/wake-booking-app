import UIStore from '@store/ui.store';
import UserStore from '@store/user.store';
import AdvertisersStore from '@store/advertisers.store';

export default class RootStore {
  constructor() {
    this.uiStore = new UIStore(this);
    this.userStore = new UserStore(this);
    this.advertisersStore = new AdvertisersStore(this);
  }
}
