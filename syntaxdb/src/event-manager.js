export class EventManager {
    #events = new Map();

    on(eventName, eventHandler) {
        const subscribers = this.#events.get(eventName) || [];
        subscribers.push(eventHandler)
        this.#events.set(eventName, subscribers);
    }

    dispatch(eventName, data) {
        const subscribers = this.#events.get(eventName);
        if (subscribers) {
            subscribers.forEach(eventHandler => eventHandler(data))
        }
    }

    off() {
        //pending implementation
    }
}