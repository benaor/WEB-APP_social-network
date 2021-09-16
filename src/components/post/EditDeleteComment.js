import React, { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { useDispatch } from "react-redux"
import { deleteComment, editComment } from "../../actions/post.actions"
import { UidContext } from "../AppContext"

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState("")
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.preventDefault()
    if (text) {
      dispatch(editComment(postId, comment._id, text))
      setText("")
      setEdit(false)
    }
  }

  const handleDelete = () => dispatch(deleteComment(postId, comment._id))

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) setIsAuthor(true)
    }
    checkAuthor()
  }, [uid, comment.commenterId])

  return (
    <div className="edit-comment">
      {isAuthor && !edit && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={(e) => setEdit(!edit)}>
            {" "}
            Editer{" "}
          </label>
          <input
            type="text"
            name="text"
            id="text"
            className=""
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (
                  window.confirm(
                    "Voulez-vous vraiment supprimer ce commentaire ?"
                  )
                )
                  handleDelete()
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete-comment" />
            </span>
            <input type="submit" value="Modifier" />
          </div>
        </form>
      )}
    </div>
  )
}

export default EditDeleteComment
