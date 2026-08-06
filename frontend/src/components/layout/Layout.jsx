import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useAuth } from '../../hooks/useAuth'
import './Layout.css'

/**
 * Shell used for authenticated app pages: topbar + sidebar + content.
 * Marketing pages (Home, Login, Register) render their own simpler shell.
 */
export default function Layout({ children }) {
  const { isAuthenticated } = useAuth()

  return (
    <div className="layout">
      <Navbar />
      <div className="layout__body">
        {isAuthenticated ? <Sidebar /> : null}
        <main className="layout__content">
          <div className="container">{children}</div>
        </main>
      </div>  
    </div>
  )
}
