import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/ui/Navigation'
import CourseCard from './components/ui/CourseCard'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import LessonPage from './pages/LessonPage'
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
            <Route path="/lessons/:id" element={<LessonPage/>} />
          </Routes>
          <Toaster/>
        </main>
      </div>
    </div>
  )
}

export default App
