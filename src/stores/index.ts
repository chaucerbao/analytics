// Stores
import EventStore, { IEvent } from './event-store'

// Definitions
import { DocumentScope } from 'nano'
export interface IDesignDocument {
  language: string
  views: {
    [index: string]: {
      map?: string
      reduce?: string
    }
  }
}
export interface IStores {
  event: EventStore
}

// CouchDB Views
declare const emit: any
const byTimestamp = function(doc: IEvent) {
  emit([doc.path, doc.timestamp], doc)
}

// Store collection
export default (db: DocumentScope<IEvent>) => ({
  event: new EventStore(db)
})

export function provision(db: DocumentScope<IDesignDocument>) {
  return new Promise((resolve, reject) => {
    db.head('_design/events', (_headError, _, headers) => {
      const _rev = headers && JSON.parse(headers.etag)
      const designDocument = {
        language: 'javascript',
        views: {
          byTimestamp: {
            map: byTimestamp.toString()
          }
        }
      }

      db.insert(
        Object.assign(designDocument, _rev ? { _rev } : {}),
        '_design/events',
        (insertError, view) => {
          if (insertError) {
            reject(insertError)
          }

          resolve(view)
        }
      )
    })
  })
}
