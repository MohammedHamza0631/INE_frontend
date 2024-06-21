import React from 'react'
import Navigation from './components/ui/Navigation'
import CourseCard from './components/ui/CourseCard'
function App () {
  return (
    <div className='dark grid-background'>
      <div className='flex flex-col'>
        <nav>
          <Navigation />
        </nav>
        <div className='grid grid-cols-4 px-8 py-4 gap-4'>
          <CourseCard />
          <CourseCard />
          <CourseCard />
     
          <CourseCard />
        </div>
      </div>
    </div>
  )
}

export default App
