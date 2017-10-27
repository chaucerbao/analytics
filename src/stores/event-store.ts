// Definitions
export interface IEvent {
  name: string
  params?: { [param: string]: string | number | boolean }
  timestamp: Date
}

// Store
export default class EventStore {
  insert(key: string, events: IEvent[]) {
    return {
      key,
      events
    }
  }

  retrieve(key: string, start: Date, end: Date) {
    return {
      key,
      start,
      end
    }
  }
}

export type IEventStore = typeof EventStore
