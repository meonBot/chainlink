import React from 'react'
import { Redirect } from 'react-router-dom'
import { Networks } from '../utils'
import feeds from '../feeds.json'

interface Props {
  render: any
  match: any
  networkId?: Networks
}

/**
 * WithConfig enhancer
 *
 * Find a FeedConfig that satisfies the match and inject it into the
 * rendered component. If a FeedConfig doesn't satisy the match, this
 * component redirects to the root of the application '/'
 */
const WithConfig = ({ render, match, networkId }: Props) => {
  const config = feeds.find((contractConfig: any) => {
    if (match.params.pair) {
      return (
        compareInsensitive(contractConfig.path, match.params.pair) &&
        contractConfig.networkId === networkId
      )
    } else if (match.params.address) {
      return compareInsensitive(
        contractConfig.contractAddress,
        match.params.address,
      )
    } else {
      return false
    }
  })

  return config ? render(config) : <Redirect to={'/'} />
}

function compareInsensitive(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase()
}

export default WithConfig
