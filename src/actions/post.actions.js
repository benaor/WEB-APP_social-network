import axios from "axios"

// posts
export const GET_POSTS = "GET_POSTS"

export const getPosts = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => dispatch({ type: GET_POSTS, payload: res.data }))
      .catch((err) => console.error(err))
  }
}
