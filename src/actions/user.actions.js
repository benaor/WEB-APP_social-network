import axios from "axios"

//USER
export const GET_USER = "GET_USER"
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const UPDATE_BIO = "UPDATE_BIO"
export const FOLLOW_USER = "FOLLOW_USER"
export const UNFOLLOW_USER = "UNFOLLOW_USER"

// ERRORS
export const GET_USER_ERRORS = "GET_USER_ERRORS"

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data })
      })
      .catch((err) => console.error(err))
  }
}

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        if (res.data.errors)
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors })
        else {
          dispatch({ type: GET_USER_ERRORS, payload: "" })
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
            })
        }
      })
      .catch((err) => console.error(err))
  }
}

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/` + userId, { bio })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio })
      })
      .catch((err) => console.error(err))
  }
}

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios
      .patch(`${process.env.REACT_APP_API_URL}api/user/follow/` + followerId, {
        idToFollow
      })
      .then((res) => dispatch({ type: FOLLOW_USER, payload: { idToFollow } }))
      .catch((err) => console.error(err))
  }
}

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
        {
          idToUnfollow
        }
      )
      .then((res) =>
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } })
      )
      .catch((err) => console.error(err))
  }
}
