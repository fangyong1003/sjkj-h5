class Event {
  constructor(args) {
    this.events = {};
  }

  on(name, handler) {
    if (typeof name !== 'string' || Object.prototype.toString.call(handler) !== '[object Function]') {
      console.warn('传入参数错误');
      return false;
    }
    if (!this.events[name]) {
      this.events[name] = [];
    }
    return this.events[name].push(handler);
  }

  trigger(name) {
    if (typeof name !== 'string') {
      console.warn('传入参数错误');
      return false;
    }
    if (!this.events[name]) {
      this.events[name] = [];
      return false;
    }
    const eventArr = this.events[name];
    const args = Array.prototype.slice.apply(arguments, [1]);
    for (let i = 0, length = eventArr.length; i < length; i++) {
      eventArr[i](args);
    }
  }

  off(name, handler) {
    if (!name && !handler) {
      this.events = {};
      return;
    }
    if (!handler) {
      this.events[name] = [];
      return;
    }

    const eventArr = this.events[name];
    const index = eventArr.indexOf(handler);

    eventArr.splice(index, 1);
  }

};

export default Event;
