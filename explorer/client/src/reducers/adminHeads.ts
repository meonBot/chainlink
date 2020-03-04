import { Head } from 'explorer/models'
import { Reducer } from 'redux'
import { Actions } from './actions'

interface State {
  heads: Head[]
}

const INITIAL_STATE: State = {
  heads: [],
}

export const adminHeadsReducer: Reducer<State, Actions> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case 'FETCH_ADMIN_HEADS_SUCCEEDED': {
      return { heads: action.data }
    }
    default:
      return state
  }
}

export default adminHeadsReducer
