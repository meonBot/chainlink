import React from 'react'
import { KeyValueList } from '@chainlink/styleguide'
import { HeadShowData } from '../../../reducers/adminHeadsShow'

const LOADING_MESSAGE = 'Loading head...'

interface Props {
  headData?: HeadShowData
}

const entries = (headData: HeadShowData): [string, string][] => {
  return [
    ['url', headData.url ?? ''],
    ['uptime', headData.uptime.toString()],
    ['job runs completed', headData.jobCounts.completed.toString()],
    ['job runs errored', headData.jobCounts.errored.toString()],
    ['job runs in progress', headData.jobCounts.inProgress.toString()],
    ['total job runs', headData.jobCounts.total.toString()],
  ]
}

const Head: React.FC<Props> = ({ headData }) => {
  const title = headData ? headData.name : LOADING_MESSAGE
  const _entries = headData ? entries(headData) : []
  return (
    <KeyValueList title={title} entries={_entries} showHead={false} titleize />
  )
}

export default Head
