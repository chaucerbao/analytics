// Definitions
import { IStores } from '../stores'
import { IEvent } from '../stores/event-store'

// Action
export default (pathname: string, events: IEvent[], stores: IStores) => {
  return stores.event.insert(pathname, events.map(sanitize))
}

function sanitize(event: IEvent) {
  return {
    ...event,
    timestamp: new Date(event.timestamp)
  }
}
