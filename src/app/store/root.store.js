import UIStore from '@store/ui.store';
import UserStore from '@store/user.store';
import ScheduleStore from '@store/schedule.store';

const getInit = () => {
  try {
    return JSON.parse(window.data) || {};
  } catch (error) {
    return {};
  }
};

export default class RootStore {
  constructor() {
    this.init = getInit();

    this.ui = new UIStore(this);
    this.user = new UserStore(this);
    this.schedule = new ScheduleStore(this);
  }
}
