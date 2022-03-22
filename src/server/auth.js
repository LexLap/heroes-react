import Axios from 'axios'


export const subscribeToSite = async (username, password) => {
    try {
        const res = await Axios.post(
            'http://localhost:4000/register',
            { username, password, returnSecureToken: true }
        )

        return {
            token: res.data.token,
            user: { username: res.data.user.username, id: res.data.user._id }
        }

    } catch (err) {
        throw new Error(err.response.data.message);
    }
}

export const loginToSite = async (username, password) => {
    try {
        const res = await Axios.post(
            'http://localhost:4000/login',
            { username, password, returnSecureToken: true }
        )

        return {
            token: res.data.token,
            user: { username: res.data.user.username, id: res.data.user._id },
        }
    } catch (err) {
        throw new Error(err.response.data.message);
    }
}



