export default class HolbertonClass {
  constructor(size, location) {
    this.size = size;
    this.location = location;
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
  }

  get location() {
    return this._location;
  }

  set location(val) {
    this._location = val;
  }

  [Symbol.toPrimitive](clscast) {
    if (clscast === 'number') {
      return this.size;
    }
    if (clscast === 'string') {
      return this.location;
    }
    return this;
  }
}
