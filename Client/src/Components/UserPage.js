import React from 'react'
import Menubar from './menubar'
import { Outlet } from 'react-router-dom'

export default function UserPage() {
  return (
    <>
      <Menubar/>
      <Outlet/>
      </>
  )
}
