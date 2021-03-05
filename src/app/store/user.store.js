import { makeAutoObservable } from 'mobx';

export default class UserStore {
  user = window.data && JSON.parse(window.data);

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
