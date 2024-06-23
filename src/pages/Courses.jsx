import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CourseCard from '../components/ui/CourseCard'
function Courses () {
  const [courses, setCourses] = useState([])
  // /api/courses to GET all the courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          'https://ine-backend-u216.onrender.com/api/courses',
          {
            headers: {
              'Content-Type': 'application/json'
            }
          },
          { withCredentials: true }
        )
        // console.log('Response from API:', response.data)
        setCourses(response.data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    }
    fetchCourses()
    return () => {
      // cleanup
    }
  }, [])
  return (
    <div>
      <h1 className='text-center text-5xl font-bold text-secondary'>
        Our Courses
      </h1>
      {
        // Show a loading spinner while fetching the courses
        !courses.length && (
          <div className='flex flex-col justify-center items-center h-30'>
            <div className='animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary' />
            <div>Loading...</div>
          </div>
        )
      }
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 py-4'>
        {
          // Map over the courses and show the course card
          courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        }
      </div>
    </div>
  )
}

export default Courses
