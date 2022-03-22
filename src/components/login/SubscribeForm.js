import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import { saveUserOnCookie } from '../../cookies/cookies';
import { subscribeToSite } from '../../server/auth';

const SubscribeForm = (props) => {
    const { dispatchUserData } = useContext(LoginContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameInputValid, setIsUsernameInputValid] = useState(false);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(false);
    const [isPasswordRepeatedInputValid, setIsPasswordRepeatedInputValid] = useState(false);

    const [isAnyInputEntered, setIsAnyInputEntered] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (props.errorMessage !== "") {
            setErrorMessage(props.errorMessage);
        }
    }, [props.errorMessage]);

    const isFormValid = () => {
        return isUsernameInputValid && isPasswordInputValid && isPasswordRepeatedInputValid
    };

    const onBlurUsernameInput = (event) => {
        const newUsername = event.target.value.trim();
        setUsername(newUsername === "" ? "" : newUsername);
        setIsUsernameInputValid(newUsername !== "");
    };

    const onBlurPasswordInput = (event) => {
        const newPassword = event.target.value.trim();
        const isPasswordValid = (value) => {
            const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
            return passwordRegex.test(value);
        }
        const isInputValid = isPasswordValid(newPassword)

        if (isInputValid) {
            setPassword(newPassword)
            setIsPasswordInputValid(true)
        } else {
            setIsPasswordInputValid(false)
        }

        setIsAnyInputEntered(true)
    };

    const onBlurPasswordRepeatedInput = (event) => {
        const passwordRepeated = event.target.value.trim();
        const isInputValid = password === passwordRepeated

        if (isInputValid) {
            setIsPasswordRepeatedInputValid(true)
        }
        else {
            setIsPasswordRepeatedInputValid(false)
        }
        setIsAnyInputEntered(true)
    };

    const onSubmitform = () => {
        if (isFormValid()) {
            subscribeToSite(username, password).then(
                (userData) => {
                    dispatchUserData({
                        token: userData.token,
                        user: userData.user
                    });
                    saveUserOnCookie(userData);
                    navigate("/heroes");
                },
                (err) => {
                    setErrorMessage(err.message)
                }
            );
        }
    };

    const onClickLogin = () => {
        navigate("/login")
    };

    return (
        <div className="app-container">

            <div className="login-form">
                <h3>Register</h3>

                {errorMessage !== "" && <div className="error-message">{errorMessage}</div>}

                <input placeholder="Username" onBlur={onBlurUsernameInput} />
                {!isUsernameInputValid && isAnyInputEntered && <div className="invalid-message">Please enter username</div>}

                <input type="password" placeholder="Password" onBlur={onBlurPasswordInput} />
                {!isPasswordInputValid && isAnyInputEntered && <div className="invalid-message">{"The password does not meet requirements!"}</div>}

                <input type="password" placeholder="Password" onBlur={onBlurPasswordRepeatedInput} />
                {!isPasswordRepeatedInputValid && isAnyInputEntered && <div className="invalid-message">{"Passwords do not match!"}</div>}

                <div>
                    <div onClick={onSubmitform}
                        className={isFormValid() ? "button-container" : "button-container disabled"}>Submit</div>
                    <div onClick={onClickLogin}
                        className="button-container" >{"Login"}</div>
                </div>

            </div>
        </div>
    );
};

export default SubscribeForm;