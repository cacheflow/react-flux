class Dispatcher {
  constructor() {
    this._id = 0
    this._cbs = {}
  }
  register(cb) {
    this._cbs[this._id] = cb
    return this._id++
  }
  unregister(id) {
    if (this._cbs.hasOwnPropery(id)) {
      delete this._cbs[id]
    }
  }

  dispatch(payload) {
    for(let id in this._cbs) {
        this._cbs[id](payload)
    }
  }
}

let dispatcher = new Dispatcher()

class Store {
  constructor() {
    this._littleStore = {}
    this._littleStore.state = {}
    this._id = 0
    this._emitter = new Dispatcher()
  }
  registerWithDispatcher() {
    dispatcher.register((payload) => {
      switch(payload.type) {
        case "HELLO_WORLD":
          this._littleStore["state"][this._id] = payload.text
          this._id++
          break;

        case "GOODBYE_WORLD":
          this._littleStore["state"][this._id] =  payload.text
          this._id++
          break;

        default:
          return
      }
      this._emitter.dispatch()
    })
  }
  addListener(func) {
    return this._emitter.register(func)
  }

  removeListener(id) {
    this._emitter.unregister(id)
  }

  getState() {
    return this._littleStore
  }
}

let store = new Store()
store.registerWithDispatcher()
let listenEvent = store.addListener(() => console.log(store.getState()))
store.removeListener(listenEvent)
dispatcher.dispatch({type: "HELLO_WORLD", text: "Hello world!"})
dispatcher.dispatch({type: "GOODBYE_WORLD", text: "Hello world again"})
console.log(store.getState())
