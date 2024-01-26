import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidenav from './Sidenav'

function AdminRoot() {
  return (
    <>
    <Sidenav/>  
    <Outlet/>
    </>
  )
}

export default AdminRoot