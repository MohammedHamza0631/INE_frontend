import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CourseCard from '../components/ui/CourseCard'
function Courses () {
  const [courses, setCourses] = useState([])
  // /api/courses to GET all the courses
  useEffect(() => {
    axios.get('/api/courses').then(response => {
      setCourses(response.data)
    })
  }, [])
  return (
    <div>
      <h1 className='text-center text-2xl font-bold text-secondary'>
        Our Courses
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 py-4'>
        <CourseCard/>
        <CourseCard/>
        <CourseCard/>
        <CourseCard/>
      </div>
    </div>
  )
}

export default Courses
