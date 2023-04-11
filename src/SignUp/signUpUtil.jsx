import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import config from "../firebase";

const app = initializeApp(config);
const auth = getAuth();
const db = getDatabase();

function handleSignUp(event) {
    if (event) {
        event.preventDefault();
      }
    const { email, password, username, school, course, department } = event.target.elements;
    
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        const uid = user.uid;
        
        // Save user data in Realtime Database
        const userRef = ref(db, `users/${uid}`);
        set(userRef, {
          username: username.value,
          school: school.value,
          course: course.value,
          department: department.value
        });
      })
      .catch((error) => {
        // Handle errors
        console.log(error.message);
      });
}
  
export default handleSignUp;