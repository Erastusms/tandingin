import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidenav from './Sidenav'

function MemberRoot() {
  return (
    <>
    <Sidenav/>  
    <Outlet/>
    </>
  )
}

export default MemberRoot