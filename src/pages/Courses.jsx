import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from '@nextui-org/react'
import { SearchIcon } from '../components/ui/SearchIcon'
import CourseCard from '../components/ui/CourseCard'

function Courses () {
  const [courses, setCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchCourses = async (term = '') => {
    setLoading(true)
    const controller = new AbortController()
    try {
      const url = term
        ? `https://ine-backend.vercel.app/api/courses/search?term=${term}`
        : 'https://ine-backend.vercel.app/api/courses'
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      })
      setCourses(response.data)
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching courses:', error)
      }
    } finally {
      setLoading(false)
    }
    return () => controller.abort()
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCourses(searchTerm)
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleSearch = e => {
    e.preventDefault()
    fetchCourses(searchTerm)
  }

  return (
    <div className=' min-h-screen py-12 text-gray-100'>
      <h1 className='text-center text-5xl font-extrabold text-purple-400 mb-8'>
        Explore Our <span className='text-purple-600'>Courses</span>
      </h1>
      <p className='text-center text-lg md:text-xl max-w-2xl mx-auto mb-6 text-gray-400'>
        Discover the right course for you and take the next step in your
        learning journey. Search and browse through our collection of top-rated
        courses.
      </p>
      <form onSubmit={handleSearch} className='flex justify-center mb-10'>
        <Input
          classNames={{
            base: 'max-w-full px-8 sm:max-w-[51rem] h-12',
            inputWrapper:
              'bg-gray-900 text-white shadow-lg rounded-lg border border-gray-700'
          }}
          placeholder='Search for a course...'
          size='lg'
          startContent={<SearchIcon size={18} className='text-gray-500' />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
      {loading ? (
        <div className='flex justify-center items-center'>
          <div className='animate-spin rounded-full h-24 w-24 border-t-4 border-purple-500'></div>
          <span className='ml-4 text-lg text-gray-400'>Loading...</span>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6'>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Courses
