import * as api from '../api/index'
import { request } from './helpers'

export const fetchAdminHeads = request(
  'ADMIN_HEADS',
  api.v1.adminHeads.getHeads,
  json => json,
)

export const fetchAdminOperator = request(
  'ADMIN_HEAD',
  api.v1.adminHeads.getHead,
  json => normalize(json, { endpoint: 'head' }),
)
