import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { LoginContext } from '../context/LoginContext';
import { deleteUserFromCookie } from '../cookies/cookies';

const Header = () => {
    const { userData, dispatchUserData } = useContext(LoginContext);
    const navigate = useNavigate();

    const onClickLogout = () => {
        dispatchUserData({ token: '', user: null });
        deleteUserFromCookie();
        navigate("/login");
    }

    return (
        <div id="header-container">

            <div>
                <h1>Heroes</h1>
            </div>

            {
                !!userData.user &&
                <div className="button-container"
                    id="login-button"
                    onClick={() => onClickLogout()}
                >Logout</div>
            }

        </div>
    );
};

export default Header;