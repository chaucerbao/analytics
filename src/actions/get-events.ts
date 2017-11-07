// Definitions
import { IStores } from '../stores'
import { IEvent } from '../stores/event-store'
export interface IRange {
  start?: string
  end?: string
}

// Action
export default async (pathname: string, range: IRange, stores: IStores) => {
  const { start, end } = range

  // Date range
  const now = new Date()
  const startDate = start
    ? new Date(start)
    : new Date(new Date().setHours(now.getHours() - 7 * 24))
  const endDate = end ? new Date(end) : now

  // Retrieve events
  const events = (await stores.event.retrieve(
    pathname,
    startDate,
    endDate
  )) as IEvent[]

  return events.map(({ name, params, timestamp }) => ({
    name,
    params,
    timestamp
  }))
}
