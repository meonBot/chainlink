import * as jsonapi from '@chainlink/json-api-client'
import * as models from 'explorer/models'

/**
 * Index lists Heads, one page at a time.
 *
 * @example "<application>/api/v1/admin/heads?size=1&page=2"
 */
const INDEX_ENDPOINT = '/api/v1/admin/heads'
type IndexRequestParams = jsonapi.PaginatedRequestParams
const index = jsonapi.fetchResource<IndexRequestParams, models.Head[]>(
  INDEX_ENDPOINT,
)

/**
 * Index lists Heads, one page at a time.
 * @param page The page number to fetch
 * @param size The maximum number of operators in the page
 */
export function getHeads(): Promise<
  jsonapi.PaginatedApiResponse<models.Head[]>
> {
  return index()
}
