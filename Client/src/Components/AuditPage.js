import React from 'react'
import AuditNavbar from './AuditNavbar';
import { Outlet } from 'react-router-dom'

export default function AuditPage() {
  return (
    <>
    <AuditNavbar/>
    <Outlet/>
    </>
  )
}
