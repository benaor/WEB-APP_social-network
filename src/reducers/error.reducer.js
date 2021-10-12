import { GET_POST_ERRORS } from "../actions/post.actions"
import { GET_USER_ERRORS } from "../actions/user.actions"

const initialState = {
  postError: [],
  userError: []
}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        ...state,
        postError: action.payload
      }
    case GET_USER_ERRORS:
      return {
        ...state,
        userError: action.payload
      }
    default:
      return state
  }
}

export default errorReducer
