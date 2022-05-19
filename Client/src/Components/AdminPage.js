import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

export default function AdminPage() {
  return (
    <>
    <AdminNavbar/>
    <Outlet/>
    </>
  )
}
