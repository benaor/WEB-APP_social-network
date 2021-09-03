import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "../../utils/utils"
import { followUser, unfollowUser } from "../../actions/user.actions"

const FollowHandler = ({ idToFollow }) => {
  // state
  const userData = useSelector((state) => state.userReducer)
  const [isFollowed, setIsFollowed] = useState(false)

  // hooks
  const dispatch = useDispatch()

  //Handle
  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow))
    setIsFollowed(true)
  }

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow))
    setIsFollowed(false)
  }

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) setIsFollowed(true)
      else setIsFollowed(false)
    }
  }, [userData, idToFollow])

  return (
    <>
      {!isEmpty(userData) &&
        (isFollowed ? (
          <span>
            <button onClick={handleUnfollow} className="unfollow-btn">
              Abonnés
            </button>
          </span>
        ) : (
          <span>
            <button onClick={handleFollow} className="follow-btn">
              Suivre
            </button>
          </span>
        ))}
    </>
  )
}

export default FollowHandler
