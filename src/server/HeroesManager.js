import Axios from "axios";
import { deleteUserFromCookie } from "../cookies/cookies";

const url = 'http://localhost:4000'

export const getCards = async (token) => {
    const headers = { token }

    try {
        const result = await Axios.get(url + '/heroes', { headers })
        return result.data
    } catch (error) {
        if (error.response && error.response.status) {
            if (error.response.data.message === "jwt expired") {
                deleteUserFromCookie();
                alert(error.response.data.message)
            } else if (error.response.data) {
                alert(error.response.data)
            }
        } else alert(error)

        return []
    }
}


export const trainHero = async (token, heroID) => {
    const headers = { token }
    try {
        const result = await Axios.patch(url + '/heroes/train', {
            heroID
        }, { headers })

        return result.data
    } catch (error) {
        if (error.response && error.response.status) {
            if (error.response.data.message === "jwt expired") {
                deleteUserFromCookie();
                alert(error.response.data.message)
            } else if (error.response.data) {
                alert(error.response.data)
            }
        } else alert(error)
        return null
    }
}


