export class EventManager {
    #events = new Map();

    on(name, subscriber) {
        const subscribers = this.#events.get(name) || [];
        subscribers.push(subscriber)
        this.#events.set(name, subscribers);
    }

    dispatch(name, data) {
        const subscribers = this.#events.get(name);
        if (subscribers) {
            subscribers.forEach(subscriber => subscriber(data))
        }
    }

    off() {
        //pending implementation
    }
}