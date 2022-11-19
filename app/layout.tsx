import './globals.css'
import Navbar from '../components/navbar'
import StateProvider from '../components/state.provider'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <StateProvider>
          <Navbar />
          {children}
        </StateProvider>
      </body>
    </html>
  )
}
