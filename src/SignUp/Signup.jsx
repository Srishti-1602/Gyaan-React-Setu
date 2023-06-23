import React, { useState, useEffect } from 'react';
import './signup.css';
import signimg from '../Images/5066999.jpg';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [course, setCourse] = useState('');
  const [department, setDepartment] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      school,
      course,
      department,
    };

    const database = getDatabase();
    const userRef = ref(database, `users/${userId}`);
    update(userRef, { ...newUser, registered: true })
      .then(() => {
        console.log('User data updated successfully.');
        navigate('/index');
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <>
      <div className="backsign">
        <div className="App">
          <img className="JoinImg" src={signimg} alt="Logo" />
          <div className="Info">
            <h3 className="welcome">Welcome to</h3>
            <h3 className="gyaan">Gyaan Setu</h3>
            <form onSubmit={handleSignUp}>
              <label className="school">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <br />
              <label className="school">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <br />
              <label className="school">
                <input
                  type="text"
                  name="school"
                  placeholder="School"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </label>
              <br />
              <label className="school">
                <input
                  type="text"
                  name="course"
                  placeholder="Course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </label>
              <br />
              <label className="school">
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </label>
              <br />
              <button type="submit">Sign Up</button>
              <p className="Para1">
                Already have an account?{' '}
                <span style={{ color: 'yellow', cursor: 'pointer' }}>Login In</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
