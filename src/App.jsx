import { useEffect, useState } from 'react'
import useCustom from './hooks/useCustom'
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';


function App() {
  
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
