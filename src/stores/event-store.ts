// Definitions
import { DocumentScope } from 'nano'
export interface IEvent {
  path: string
  name: string
  params?: { [param: string]: string | number | boolean }
  timestamp: Date
}

// Store
export default class EventStore {
  private db: DocumentScope<IEvent>

  constructor(db: DocumentScope<IEvent>) {
    this.db = db
  }

  insert(path: string, events: IEvent[]) {
    this.db.bulk({
      docs: events.map(event => ({ path, ...event }))
    })

    return {
      path,
      events
    }
  }

  retrieve(path: string, start: Date, end: Date) {
    return new Promise((resolve, reject) => {
      this.db.view(
        'events',
        'byTimestamp',
        {
          startkey: [path, start],
          endkey: [path, end]
        },
        (error, view) => {
          if (error) {
            reject(error)
          }

          resolve(view.rows.map(row => row.value))
        }
      )
    })
  }
}

export type IEventStore = typeof EventStore
