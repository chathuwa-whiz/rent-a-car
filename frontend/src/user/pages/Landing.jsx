import React from 'react'
import { Outlet } from 'react-router-dom'
import Hero from './Hero'
import Specials from './Specials'
import AboutUs from './AboutUs'
import Contact from './Contact'

export default function Landing() {
    return (
        <div>
            <Hero />
            <Specials />
            <AboutUs />
            <Contact />
        </div>
    )
}