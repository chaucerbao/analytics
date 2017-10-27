// Libraries
import { json, send } from 'micro'
import { parse } from 'url'

// Definitions
import { IncomingMessage, ServerResponse } from 'http'
import { IEvent } from './stores/event-store'

// Actions
import postEvents from './actions/post-events'
import getEvents from './actions/get-events'

// Stores
import stores from './stores'

// Server
module.exports = async (request: IncomingMessage, response: ServerResponse) => {
  const { method, url } = request
  const { pathname, query } = parse(url || '', true)

  if (!pathname) {
    return send(response, 404)
  }

  try {
    switch (method) {
      case 'POST':
        return send(
          response,
          202,
          postEvents(pathname, (await json(request)) as IEvent[], stores)
        )
      case 'GET':
        return send(response, 200, getEvents(pathname, query, stores))
    }
  } catch (e) {
    return send(response, 500)
  }

  return send(response, 404)
}
