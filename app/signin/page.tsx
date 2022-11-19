'use client'

import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "../../api/auth.api"
import { signInReducer, statusSelector } from "../../state.management/auth.slice"

export default function SignInPage() {
    const dispatch = useDispatch()
    const status = useSelector(statusSelector)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return status === 'valid'
        ? (<div>Already Signed In</div>) 
        : (
        <div className="flex items-center justify-center m-auto">
            <label>
                username: <input className="border-2 rounded-full" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </label><br />
            <label className="r-4">
                password: <input className="border-2 rounded-full" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </label><br />
            <button className="bg-blue-500 p-2 rounded-full mr-4" onClick={async () => {
                try {
                    const data = await signIn(username, password)
                    dispatch(signInReducer(data))
                } catch (error) {
                    console.error(error)
                }
            }}>Sign In</button>
        </div>
    )
}