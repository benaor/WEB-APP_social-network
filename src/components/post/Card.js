import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../../actions/post.actions"
import { dateParser, isEmpty } from "../../utils/utils"
import FollowHandler from "../profil/FollowHandler"
import DeleteCard from "./DeleteCard"
import LikeButton from "./LikeButton"

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdated, setIsUpdated] = useState(false)
  const [textUpdate, setTextUpdate] = useState(null)
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const updateItem = () => {
    if (textUpdate) dispatch(updatePost(post._id, textUpdate))
    setIsUpdated(false)
  }

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false)
  }, [userData, usersData])

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture
                    else return null
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.posterId) return user.pseudo
                      else return null
                    })}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type="card" />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {!isUpdated && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modifications
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {userData._id === post.posterId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit-post" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img src="./img/icons/message1.svg" alt="comment" />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
          </div>
        </>
      )}
    </li>
  )
}

export default Card
