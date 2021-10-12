import React from "react"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { UidContext } from "../components/AppContext"
import LeftNav from "../components/LeftNav"
import Card from "../components/post/Card"
import FriendsHint from "../components/profil/FriendsHint"
import Trends from "../components/Trends"
import { isEmpty } from "../utils/utils"

const Trending = () => {
  const trendList = useSelector((state) => state.trendingReducer)
  const uid = useContext(UidContext)

  return (
    <div className="trending-page">
      <LeftNav />
      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) &&
            trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
          {uid && <FriendsHint />}
        </div>
      </div>
    </div>
  )
}

export default Trending
