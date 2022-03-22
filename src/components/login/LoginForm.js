import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { saveUserOnCookie } from "../../cookies/cookies";
import { loginToSite } from "../../server/auth";

const LoginForm = (props) => {
	const { dispatchUserData } = useContext(LoginContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isUsernameInputValid, setIsUsernameInputValid] = useState(false);
	const [isPasswordInputValid, setIsPasswordInputValid] = useState(false);
	const [isAnyInputEntered, setIsAnyInputEntered] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		if (props.errorMessage !== "") {
			setErrorMessage(props.errorMessage);
		}
	}, [props.errorMessage]);


	const isFormValid = () => {
		return isUsernameInputValid && isPasswordInputValid
	};

	const onBlurUsernameInput = (event) => {
		const theUsername = event.target.value.trim()
		setUsername(theUsername === "" ? "" : theUsername);
		setIsUsernameInputValid(theUsername !== "");
		setIsAnyInputEntered(true)
	};

	const onBlurPasswordInput = (event) => {
		const thePassword = event.target.value.trim();
		setPassword(thePassword === "" ? "" : thePassword);
		setIsPasswordInputValid(thePassword !== "");
		setIsAnyInputEntered(true)
	};

	const onSubmitform = () => {
		if (isFormValid()) {
			loginToSite(username, password).then(
				(userData) => {
					dispatchUserData({
						token: userData.token,
						user: userData.user
					});
					saveUserOnCookie(userData);
					navigate("/heroes");
				},
				(err) => {
					setErrorMessage(err.message);
				}
			);
		}
	};

	const onClickSubscribe = () => {
		navigate("/register")
	};

	return (
		<div className="app-container">
			<div className="login-form">

				<h3>Login</h3>

				{errorMessage !== "" && <div className="error-message">{errorMessage}</div>}

				<input placeholder="Username" onBlur={onBlurUsernameInput} />
				{!isUsernameInputValid && isAnyInputEntered && <div className="invalid-message">You must enter your username</div>}

				<input type="password" placeholder="Password" onBlur={onBlurPasswordInput} />
				{!isPasswordInputValid && isAnyInputEntered && <div className="invalid-message">You must enter your password</div>}

				<div>
					<div onClick={onSubmitform}
						className={isFormValid() ? "button-container" : "button-container disabled"}>Submit</div>
					<div onClick={onClickSubscribe}
						className="button-container" >{"Register"}</div>
				</div>

			</div>
		</div>

	);
};

export default LoginForm;
