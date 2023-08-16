import React from "react";
import "./community.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar1 from "../NewNav/NewNav";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import FilterBy from "./CommunityComponents/FilterBy";
import NoteData from "./CommunityComponents/NoteData";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const jsonData = {};

function Community() {
	const [userId, setUserId] = useState(null); // Store the userId here
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Store the isLoggedIn state here

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserId(user.uid); // Set the userId if the user is logged in
			} else {
				setIsLoggedIn(false);
				setUserId(null); // Reset the userId if the user is not logged in
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	/* Handling Fetch Community data from Firebase and Giving JSON output for rendering */
	const [communityData, setCommunityData] = useState(jsonData);

	useEffect(() => {
		const database = getDatabase();
		const communityRef = ref(database, "community");

		onValue(communityRef, (snapshot) => {
			const data = snapshot.val();
			console.log(data);
			setCommunityData(data);
			console.log(communityData);
		});
	}, []);
	/* End of Handling Search and Giving JSON output for rendering */
	const handleSetData = (newData) => {
		setCommunityData(newData);
		console.log(newData);
	};

	return (
		<div>
			<Navbar1 />
			<div className="row row-cols-1 row-cols-md-3 mb-2 text-center">
				<div className="col-filter col-md-3">
					<FilterBy />
				</div>
				<div className="col-search col-md-8">
					<div className="user-search">
						<form id="search-user">
							<input
								type="search"
								className="searchbar-user"
								placeholder=" Search topics from users..."
								name="search"
								id="search-input"
							/>
						</form>
					</div>
					<NoteData userId={userId} />
				</div>
			</div>
		</div>
	);
}

export default Community;
