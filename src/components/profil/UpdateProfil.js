import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateBio } from "../../actions/user.actions"
import { dateParser } from "../../utils/utils"
import LeftNav from "../LeftNav"
import FollowHandler from "./FollowHandler"
import UploadImg from "./UploadImg"

const UpdateProfil = () => {
  // State
  const [bio, setBio] = useState("")
  const [updateForm, setUpdateForm] = useState(false)
  const [followingPopup, setFollowingPopup] = useState(false)
  const [followersPopup, setFollowersPopup] = useState(false)

  //import from store
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)

  //Hooks
  const dispatch = useDispatch()

  //Handle
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
          <img src={userData.picture} alt="user-pic" />
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
          <h4>
            Membre depuis le{" "}
            {userData.createdAt
              ? dateParser(userData.createdAt)
              : "début de l'aventure"}
          </h4>
          <h5 onClick={() => setFollowingPopup(!followingPopup)}>
            Abonnements :{" "}
            {userData.following ? userData.following.length : "Chargement"}
          </h5>
          <h5 onClick={() => setFollowersPopup(!followersPopup)}>
            Abonnés :{" "}
            {userData.followers ? userData.followers.length : "Chargement"}
          </h5>
        </div>
      </div>
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span
              onClick={() => setFollowersPopup(!followersPopup)}
              className="cross"
            >
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type="suggestion"
                          />
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span
              onClick={() => setFollowingPopup(!followingPopup)}
              className="cross"
            >
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type="suggestion"
                          />
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateProfil
