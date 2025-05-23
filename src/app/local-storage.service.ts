import { Injectable } from '@angular/core';

interface Storage {
  color: any;
  password: object;
  permission: object;
  changeCase: object;
  loremIpsum: object;
  loremImage: object;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage = {
    color: { master: [255, 216, 1]},
    password: {
      length: 16,
      chars: [true, true, true, false, false], // the fifth is a dummy to manage the regenerate
    },
    permission: { bool: [true, true, false, true, true, false, true, false, false] },
    changeCase: { text: '', choice: 'keep' },
    loremIpsum: { length: 2, choice: 'paragraphs' },
    loremImage: { color: '255, 216, 1', width: 400, height: 200 },
  };
  
  constructor() {
    let browserStorage = localStorage.getItem('codecorbie') || null;
    if (browserStorage) {
      this.storage = JSON.parse(browserStorage);
    }
  }

  getProp(
    key:
      | ''
      | 'color'
      | 'password'
      | 'permission'
      | 'changeCase'
      | 'loremIpsum'
      | 'loremImage'
  ) {
    if (key) {
      return this.storage[key];
    } else {
      return this.storage;
    }
  }

  setProp(
    key:
      | 'color'
      | 'password'
      | 'permission'
      | 'changeCase'
      | 'loremIpsum'
      | 'loremImage',
    value: object
  ) {
    let tempStorage = { ...this.storage };
    tempStorage[key] = value;
    this.storage = tempStorage;
  }
}
