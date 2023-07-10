import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database'
import '../dashboard.css'
import './TaskComponents'
import TaskComponents from './TaskComponents'
import EditProfile from '../../icons/icons8-edit-50.png'

function UserProfile ({ userId }) {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const database = getDatabase()
    const userRef = ref(database, `users/${userId}`)

    onValue(userRef, snapshot => {
      const userData = snapshot.val()
      setUserInfo(userData)
    })
  }, [userId])

  const getProfilePictureUrl = username => {
    const baseUrl = 'https://robohash.org/'
    const size = '200x200'
    const format = 'png'
    const hash = encodeURIComponent(username)
    return `${baseUrl}${hash}?size=${size}&format=${format}`
  }

  return (
    <div className='col col-md-4 col-lg-3'>
      <div className='card mb-4 rounded-3 shadow-sm'>
        <div className='card-body personal-info'>
          <div className='d-flex justify-content-start'>
            <a href=' '>
              <img
                src={EditProfile}
                alt='Edit'
                className='btn-Edit btn-outline-dark'
                id='EditProf'
              />
            </a>
          </div>
          <h1 className='card-title pricing-card-title personal-info-title'>
            <img
              alt='info'
              className='infophoto'
              src={userInfo ? getProfilePictureUrl(userInfo.username) : ''}
            />
          </h1>
          <ul className='list-unstyled mt-3 mb-4'>
            <li className='username' id='username'>
              {userInfo && userInfo.username}
            </li>
            <li className='username' id='course'>
              {userInfo && userInfo.course}
            </li>
            <li className='username' id='Department'>
              {userInfo && userInfo.department}
            </li>
            <li className='username' id='school'>
              {userInfo && userInfo.school}
            </li>
          </ul>
          {/* <button type="button" class="w-100 btn btn-lg btn-dark">Get started</button> */}
        </div>
      </div>
      <TaskComponents />
    </div>
  )
}

export default UserProfile
