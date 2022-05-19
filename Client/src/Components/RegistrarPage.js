import React from 'react'
import { Outlet } from 'react-router-dom'
import RegistrarNavBar from './RegistrarNavBar';
export default function RegistrarPage() {
  return (
    <>
    <RegistrarNavBar/>
    <Outlet/>
    </>
  )
}
