import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/ui/Navigation'
import { useDispatch } from 'react-redux'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import { Toaster } from 'react-hot-toast'
function App () {
  return (
    <div className='dot'>
      <div className='flex flex-col'>
        <nav>
          <Navigation />
        </nav>
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/courses/:id' element={<CourseDetail />} />
          </Routes>
          <Toaster />
        </main>
      </div>
    </div>
  )
}

export default App
