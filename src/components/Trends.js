import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getTrends } from "../actions/post.actions"
import trendingReducer from "../reducers/trending.reducer"
import { isEmpty } from "../utils/utils"

const Trends = () => {
  const posts = useSelector((state) => state.allPostsReducer)
  const usersData = useSelector((state) => state.usersReducer)
  const trendList = useSelector((state) => state.trendingReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArray = Object.keys(posts).map((i) => posts[i])
      let sortedArray = postsArray.sort(
        (a, b) => b.likers.length - a.likers.length
      )
      sortedArray.length = 3
      dispatch(getTrends(sortedArray))
    }
  }, [posts, dispatch])

  return (
    <div className="trending-container">
      <h4>Trending</h4>
      <NavLink exact to="/trending">
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post._id}>
                  <div>
                    {post.picture && <img src={post.picture} alt="post-pic" />}
                    {post.video && (
                      <iframe
                        id="inlineFrameExample"
                        src={post.video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        title={post._id}
                        allowFullScreen
                      ></iframe>
                    )}
                    {isEmpty(post.picture) && isEmpty(post.video) && (
                      <img
                        src={
                          usersData[0] &&
                          usersData
                            .map((user) => {
                              if (user._id === post.posterId)
                                return user.picture
                              else return null
                            })
                            .join("")
                        }
                        alt="profil-pic"
                      />
                    )}
                  </div>
                  <div className="trend-content">
                    <p>{post.message}</p>
                    <span>Lire</span>
                  </div>
                </li>
              )
            })}
        </ul>
      </NavLink>
    </div>
  )
}

export default Trends
