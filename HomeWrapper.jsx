import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/product/Header'
import Footer from '../component/Footer'

function HomeWrapper({val}) {
  return (
   <>
   {!val && <Header/>}
   <Outlet />
   {!val && <Footer/>}
   </>
  )
}

export default HomeWrapper