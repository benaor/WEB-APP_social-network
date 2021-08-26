import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateBio } from "../../actions/user.action"
import { dateParser } from "../../utils/utils"
import LeftNav from "../LeftNav"
import UploadImg from "./UploadImg"

const UpdateProfil = () => {
  const [bio, setBio] = useState("")
  const [updateForm, setUpdateForm] = useState(false)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio))
    setUpdateForm(false)
  }

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-picture" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false ? (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier ma bio
                </button>
              </>
            ) : (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>
                  Valider les modifications
                </button>
              </>
            )}
          </div>
          <h4>Membre depuis le { dateParser(userData.createdAt)}</h4>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfil
