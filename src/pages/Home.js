import React from "react"
import { useContext } from "react"
import { UidContext } from "../components/AppContext"
import LeftNav from "../components/LeftNav"
import Log from "../components/log"
import NewPostForm from "../components/post/NewPostForm"
import FriendsHint from "../components/profil/FriendsHint"
import Thread from "../components/Thread"
import Trends from "../components/Trends"

const Home = () => {
  const uid = useContext(UidContext)

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signIn={true} signUp={false} />}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
