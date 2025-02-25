import React from 'react'
import Header from './components/Header'
import Hero from './pages/Hero'
import Specials from './pages/Specials'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import Footer from './components/Footer'

export default function Layout() {
  return (
    <div>
      <Header />
      <Hero />
      <Specials />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
  )
}
