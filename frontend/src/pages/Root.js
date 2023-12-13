import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import Footer from '../components/Footer'

function Root() {
  return (
    <>
    <MainNavigation/>
    <Outlet/>
    <Footer/>
    
    </>

  )
}

export default Root