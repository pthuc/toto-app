'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "../api/auth.api"
import { signOutReducer, statusSelector } from "../state.management/auth.slice"

const menuList = [
    ['Home', '/'],
    ['Task', '/todo']
]

export default function Navbar() {
    const router = useRouter()
    const status = useSelector(statusSelector)
    const dispatch = useDispatch()
    const [sign, setSign] = useState('')
    
    useEffect(() => {
        if (status == 'invalid') {
            setSign('Sign In')
        } else {
            setSign('Sign Out')
        }
        console.log(sign, status)
    }, [sign, status, dispatch])


    return (
        <nav className="container mx-auto p-6">
            <div className="flex items-center justify-between">
                {/* Left */}
                <div>
                    <Image 
                        src="/vercel.svg"
                        height={150}
                        width={150}
                        alt="App Logo"
                    />
                </div>

                {/* Mid */}
                <div className="hidden md:flex space-x-4">
                {
                    menuList.map((item, idx) => (
                        <div key={idx} className="font-medium hover:text-red-400">
                            <Link href={item[1]}>{item[0]}</Link>
                        </div>
                    ))
                }
                </div>

                {/* Right */}
                <div>
                    <button onClick={() => {
                        if (sign === 'Sign Out') {
                            signOut().then(() => {
                                dispatch(signOutReducer(null))
                                setSign('Sign In')
                            })
                        }
                        router.push('/signin')
                    }}>
                        {sign}
                    </button>
                </div>
            </div>
        </nav>
    )
}