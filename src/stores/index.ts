// Stores
import EventStore from './event-store'

// Definitions
export interface IStores {
  event: EventStore
}

// Store collection
export default {
  event: new EventStore()
}
