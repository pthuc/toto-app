'use client'

import { useRouter, usePathname } from "next/navigation"
import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { validate } from "../api/auth.api"
import { statusSelector, signInReducer, signOutReducer } from "../state.management/auth.slice"


export default function Authenticator(
    { children }: { children: React.ReactNode }
) {
    const router = useRouter()
    const pathName = usePathname()
    const dispatch = useDispatch()
    const status = useSelector(statusSelector)
    

    useEffect(() => {
        (
            async () => {
                try {
                    const data = await validate()
                    dispatch(signInReducer(data))
                } catch (error) {
                    dispatch(signOutReducer(null))
                    if(pathName != '/signin') {
                        router.push('/signin')
                    }
                }
            }
        )()
    }, [status, pathName, dispatch, router])

    return (
        <div>
            { children }
        </div>
    )
}