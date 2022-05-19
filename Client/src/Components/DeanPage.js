import React from 'react'
import DeanNavbar from './DeanNavbar'
import { Outlet } from 'react-router-dom'

export default function DeanPage() {
  return (
    <>
    <DeanNavbar/>
    <Outlet/>
    </>
  )
}
