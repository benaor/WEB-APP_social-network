import React, { useContext } from "react"
import { UidContext } from "../components/AppContext"
import Log from "../components/log"

const Profil = () => {
  const uid = useContext(UidContext)

  return (
    <div className="profil-page">
      {uid ? (
        <h1>Update PAGE</h1>
      ) : (
        <div className="log-container">
          <Log signIn={false} signUp={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Profil
