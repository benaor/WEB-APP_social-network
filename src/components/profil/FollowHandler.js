import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "../../utils/utils"
import { followUser, unfollowUser } from "../../actions/user.actions"

const FollowHandler = ({ idToFollow, type }) => {
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
          <span onClick={handleUnfollow} c>
            {type === "suggestion" && (
              <button lassName="unfollow-btn">Abonnés</button>
            )}
            {type === "card" && (
              <img
                src="./img/icons/checked.svg"
                alt="checked"
                className="unfollow-btn"
              />
            )}
          </span>
        ) : (
          <span onClick={handleFollow} >
            {type === "suggestion" && (
              <button className="follow-btn">
                Suivre
              </button>
            )}
            {type === "card" && (
              <img
                src="./img/icons/check.svg"
                alt="check"
                className="unfollow-btn"
              />
            )}
          </span>
        ))}
    </>
  )
}

export default FollowHandler
