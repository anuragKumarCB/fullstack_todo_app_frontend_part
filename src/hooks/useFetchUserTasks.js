import axios from "axios"
import { serverURL } from "../enum"

export const useFetchUserTasks = async () => {
    try {
        const { data } = await axios.get(`${serverURL}/tasks/alltask`, {
            withCredentials: true
        })
        return data
    } catch (error) {
        return error

    }
}