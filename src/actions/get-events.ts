// Definitions
import { IStores } from '../stores'
export interface IRange {
  start?: string
  end?: string
}

// Action
export default (pathname: string, range: IRange, stores: IStores) => {
  const { start, end } = range

  // Date range
  const now = new Date()
  const startDate = start
    ? new Date(start)
    : new Date(new Date().setHours(now.getHours() - 7 * 24))
  const endDate = end ? new Date(end) : now

  return stores.event.retrieve(pathname, startDate, endDate)
}
