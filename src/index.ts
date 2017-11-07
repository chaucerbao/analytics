// Libraries
import { json, send } from 'micro'
import { parse } from 'url'
import * as nano from 'nano'
import * as dotenv from 'dotenv'

// Definitions
import { IncomingMessage, ServerResponse } from 'http'
import { IEvent } from './stores/event-store'

// Actions
import postEvents from './actions/post-events'
import getEvents from './actions/get-events'

// Stores
import Stores, { provision, IDesignDocument } from './stores'

// Environment variables
dotenv.config()
const {
  COUCHDB_HOST = '',
  COUCHDB_USER = '',
  COUCHDB_PASSWORD = ''
} = process.env

// Database
const db = (nano(
  COUCHDB_HOST.replace(/\/\//, `//${COUCHDB_USER}:${COUCHDB_PASSWORD}@`)
) as nano.ServerScope).use('analytics')
const stores = Stores(db as nano.DocumentScope<IEvent>)

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
      case 'PUT':
        return provision(db as nano.DocumentScope<IDesignDocument>)
      case 'GET':
        return send(response, 200, await getEvents(pathname, query, stores))
    }
  } catch (e) {
    return send(response, 500)
  }

  return send(response, 404)
}
