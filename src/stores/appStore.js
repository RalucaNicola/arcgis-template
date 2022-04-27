import { makeObservable, observable, computed, action } from 'mobx';

class AppStore {
  view = null;
  error = null;

  constructor() {
    makeObservable(this, {
      view: observable.ref,
      title: computed,
      loading: computed,
      setView: action,
      error: observable,
      setError: action
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

  setError(error) {
    this.error = { name: error.name, message: error.message };
  }
}

export const appStore = new AppStore();
