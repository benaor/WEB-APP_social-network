import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { isEmpty, timestampParser } from "../../utils/utils"

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [postPicture, setPostPicture] = useState(null)
  const [postVideo, setPostVideo] = useState("")
  const [file, setFile] = useState()

  const userData = useSelector((state) => state.userReducer)

  const handlePicture = () => {}
  const handlePost = () => {}
  const handleCancel = () => {
    setMessage("")
    setPostVideo("")
    setPostPicture(null)
    setFile("")
  }
  const handleVideo = () => {
    let findLink = message.split(" ")
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes("https://www.youtube") ||
        findLink[i].includes("https://youtube")
      ) {
        let embed = findLink[i].replace("watch?v=", "embed/")
        setPostVideo(embed.split("&")[0])
        findLink.splice(i, 1)
        setMessage(findLink.join(" "))
        setPostPicture("")
      }
    }
  }

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false)
    handleVideo()
  }, [userData, message, postVideo])

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>
                {userData.following ? (
                  userData.following.length
                ) : (
                  <i className="fas fa-spinner fa-pulse"></i>
                )}
              </span>{" "}
              Abonnement{userData.following.length > 1 ? "s" : null}
            </p>
            <p>
              <span>
                {userData.followers ? (
                  userData.followers.length
                ) : (
                  <i className="fas fa-spinner fa-pulse"></i>
                )}
              </span>{" "}
              Abonné{userData.followers.length > 1 ? "s" : null}
            </p>
          </div>
          <NavLink to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              placeholder="Quoi de neuf ?"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {(message || postPicture || postVideo.length > 10) && (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {postVideo && (
                      <iframe
                        src={postVideo}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={postVideo}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            )}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(postVideo) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="logo-img-svg" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .png, .jpeg"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {postVideo && (
                  <button onClick={() => setPostVideo("")}>
                    Suppr. vidéo
                  </button>
                )}
              </div>
              <div className="btn-send">
                {message || postPicture || postVideo.length > 10 ? (
                  <button className="cancel" onClick={handleCancel}>
                    Annuler
                  </button>
                ) : null}

                <button className="send" onClick={handlePost}>
                  Envoyer !
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NewPostForm
