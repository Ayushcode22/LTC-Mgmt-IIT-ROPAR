import React from 'react'
import AccountsNavBar from './AccountsNavBar';
import { Outlet } from 'react-router-dom'
export default function AccountsPage() {
  return (
    <>
    <AccountsNavBar/>
    <Outlet/>
    </>
  )
}
