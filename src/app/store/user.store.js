import { makeAutoObservable } from 'mobx';

const getUser = () => {
  try {
    return JSON.parse(window.data) || {};
  } catch (error) {
    return {};
  }
};

export default class UserStore {
  user = getUser();

  isLoggedIn = !!this.user;

  constructor() {
    makeAutoObservable(this);
  }

  get name() {
    return this.user.email.split('@')[0];
  }

  canView(page) {
    return this.isLoggedIn && (this.user.isSuperAdmin || this.user.roles[page]);
  }

  canEdit(page) {
    return this.isLoggedIn && (this.user.isSuperAdmin || !!this.user.roles[page]?.isEdit);
  }
}
