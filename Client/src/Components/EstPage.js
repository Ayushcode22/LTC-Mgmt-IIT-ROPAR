import React from 'react'
import { Outlet } from 'react-router-dom'
import EstNavBar from './EstNavBar'
export default function EstPage() {
  return (
    <>
    <EstNavBar/>
    <Outlet/>
    </>
  )
}
