import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Import Firebase authentication from your project setup
import { GoogleAuthProvider } from "firebase/auth";
import "firebaseui";
import "firebaseui/dist/firebaseui.css";
import * as firebaseui from "firebaseui";
import { getDatabase, ref, onValue, set } from "firebase/database";

let ui; // Declare AuthUI instance globally

const FirebaseUIAuth = () => {
	const navigate = useNavigate();

	// Firebase UI configuration
	const uiConfig = {
		signInSuccessUrl: "/SignUp", // Redirect URL after successful sign-in
		signInFlow: "popup",
		signInOptions: [
			{
				provider: GoogleAuthProvider.PROVIDER_ID,
				customParameters: {
					prompt: "select_account",
				},
			},
		],
		callbacks: {
			signInSuccessWithAuthResult: (authResult) => {
				const user = authResult.user;
				const userId = user.uid;

				// Check if the user exists in the 'users' node of the Realtime Database
				const database = getDatabase();
				const userRef = ref(database, `users/${userId}`);

				onValue(userRef, (snapshot) => {
					const userData = snapshot.val();

					if (userData) {
						// User exists in the database
						if (userData.registered === false) {
							navigate("/SignUp");
						} else {
							navigate("/index");
						}
					} else {
						// User doesn't exist in the database, set the registration value to false
						set(userRef, { registered: false })
							.then(() => {
								console.log("User added successfully.");
								navigate("/SignUp");
							})
							.catch((error) => {
								console.error("Error adding user:", error);
							});
					}
				});

				//navigate('/SignUp'); // Redirect to the signup page
				return false; // Avoid redirecting automatically
			},
			signInFailure: (error) => {
				// Handle sign-in failure scenarios
				console.error(error);
			},
		},
	};

	// Initialize the FirebaseUI widget
	useEffect(() => {
		if (!ui) {
			ui = new firebaseui.auth.AuthUI(auth);
		}

		ui.start("#firebaseui-auth-container", uiConfig);

		return () => {
			// Clean up the AuthUI instance when the component unmounts
			ui.reset();
		};
	}, []);

	return (
		<div>
			<div id="firebaseui-auth-container"></div>
		</div>
	);
};

export default FirebaseUIAuth;
