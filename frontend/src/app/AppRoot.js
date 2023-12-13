import React from 'react'
import { Outlet } from 'react-router-dom'
import AppNavigation from '../components/AppNavigation'

function AppRoot() {
  return (
    <>
    <AppNavigation/>
    <Outlet/>
    </>
  )
}

export default AppRoot