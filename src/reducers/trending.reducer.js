import { GET_TRENDS } from "../actions/post.actions"

const initialState = {}

const trendingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRENDS:
      return action.payload
    default:
      return state
  }
}

export default trendingReducer
