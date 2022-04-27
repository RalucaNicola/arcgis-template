import { makeObservable, observable, computed, action } from 'mobx';

class AppStore {
  view = null;

  constructor() {
    makeObservable(this, {
      view: observable.ref,
      title: computed,
      loading: computed,
      setView: action
    });
  }

  get loading() {
    if (this.view || this.view === undefined) {
      return false;
    }
    return true;
  }

  get title() {
    if (this.view && this.view.map) {
      return this.view.map.portalItem.title;
    }
    return null;
  }

  setView(view) {
    this.view = view;
  }
}

export const appStore = new AppStore();
