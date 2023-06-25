import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import '../dashboard.css';

function UserProfile({ userId }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const database = getDatabase();
    const userRef = ref(database, `users/${userId}`);

    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setUserInfo(userData);
    });
  }, [userId]);

  const getProfilePictureUrl = (username) => {
    const baseUrl = 'https://robohash.org/';
    const size = '200x200';
    const format = 'png';
    const hash = encodeURIComponent(username);
    return `${baseUrl}${hash}?size=${size}&format=${format}`;
  };

  return (
    <div className='col'>
      <div className='card mb-4 rounded-3 shadow-sm'>
        <div className='card-body personal-info'>
          <h1 className='card-title pricing-card-title personal-info-title'>
            <img
              alt='information'
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
    </div>
  );
}

export default UserProfile;
