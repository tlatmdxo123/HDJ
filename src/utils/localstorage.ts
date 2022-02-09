class LocalStorage {
  key: string;
  constructor(key: string) {
    this.key = key;
  }
  set(value: string) {
    localStorage.setItem(this.key, value);
  }
  get() {
    const value = localStorage.getItem(this.key);

    return value ? JSON.parse(value) : undefined;
  }
}

export const BoardStorage = new LocalStorage('board');
