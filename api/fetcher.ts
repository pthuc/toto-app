import axios from "axios"

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'aplication/json'

export default async function fetcher(url: string, method: string, data?: any) {
    const responce = await axios({
        method,
        url,
        data
    })
    return responce.data
}