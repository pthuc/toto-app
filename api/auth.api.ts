import fetcher from "./fetcher"

const AUTH_URI = 'http://localhost:3001/auth'

export const signIn = async(username: string, password: string) => {
    const url = `${AUTH_URI}/signin`
    const data = await fetcher(url, 'post', {username, password})
    return data
}

export const signOut = async() => {
    const url = `${AUTH_URI}/signout`
    await fetcher(url, 'post')
    return null
}

export const validate = async() => {
    const url = `${AUTH_URI}/validate`
    const data = await fetcher(url, 'post')
    return data
}