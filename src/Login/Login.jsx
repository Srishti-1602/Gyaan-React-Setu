import React, { useEffect } from "react";
import "./login.css";
// import logo from '../Images/Gyaan setu.png';
import logimg from "../Images/6059971.jpg";
import { useNavigate } from "react-router-dom";
import FirebaseUIAuth from "./FirebaseUIAuth";

function Login() {
	const navigate = useNavigate();

	const handleSignUpClick = () => {
		navigate("/SignUp");
	};

	return (
		<>
			<div className="back">
				<div className="App">
					<img className="JoinImg" src={logimg} alt="Logo" />
					<div className="Info">
						<h3 className="welcome">Welcome to</h3>
						<h3 className="gyaan">Gyaan Setu</h3>
						<FirebaseUIAuth />
						<p className="Para1">
							Don't have an account?{" "}
							<span
								onClick={handleSignUpClick}
								style={{ color: "yellow", cursor: "pointer" }}>
								Sign Up
							</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
