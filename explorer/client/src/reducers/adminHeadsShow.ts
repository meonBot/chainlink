import { Actions } from './actions'
import { Reducer } from 'redux'

export interface HeadShowData {
  id: string
  name: string
  url?: string
  createdAt: string
  uptime: number
  jobCounts: {
    completed: number
    errored: number
    inProgress: number
    total: number
  }
}

interface State {
  id?: {
    attributes: HeadShowData
  }
}

const INITIAL_STATE: State = {}

export const adminHeadsShow: Reducer<State, Actions> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case 'FETCH_ADMIN_HEAD_SUCCEEDED': {
      return action.data
    }
    default: {
      return state
    }
  }
}

export default adminHeadsShow
