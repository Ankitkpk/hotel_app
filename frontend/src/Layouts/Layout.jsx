import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'

const Layout = ({data}) => {
  return (
<div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <SearchBar/>
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout