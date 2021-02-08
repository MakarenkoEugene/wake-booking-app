import { makeAutoObservable } from 'mobx';

export default class UserStore {
  user = window.user && JSON.parse(window.user);

  isLoggedIn = !!this.user;

  constructor() {
    makeAutoObservable(this);
  }

  get name() {
    return this.user.email.split('@')[0];
  }

  hasAccess(page) {
    return this.user.isSuperAdmin || this.user.roles[page].isWrite;
  }
}
