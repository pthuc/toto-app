'use client'

import { store } from "../state.management/store"
import { Provider } from "react-redux"
import Authenticator from "./authenticator"
import React from "react"

export default function StateProvider(
    { children }: { children: React.ReactNode }
) {
    return (
        <Provider store={ store }>
            <Authenticator>
                { children }
            </Authenticator>
        </Provider>
    )
}