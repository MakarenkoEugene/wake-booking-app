import { makeAutoObservable } from 'mobx';

export default class UserStore {
  isLoggedIn = true;

  user = {};

  constructor() {
    makeAutoObservable(this);
  }
}
