import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input, Button } from '@nextui-org/react'
import { SearchIcon } from '../components/ui/SearchIcon'
import CourseCard from '../components/ui/CourseCard'
function Courses () {
  const [courses, setCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  // /api/courses to GET all the courses
  const fetchCourses = async (term = '') => {
    setLoading(true)
    const controller = new AbortController()
    try {
      const url = term
        ? `https://ine-backend-u216.onrender.com/api/courses/search?term=${term}`
        : 'https://ine-backend-u216.onrender.com/api/courses'
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
    }, 400) // Delay of 500ms to simulate debounce

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
    <div>
      <h1 className='text-center text-5xl font-bold text-secondary'>
        Our Courses
      </h1>
      <form onSubmit={handleSearch}>
        <div className='flex items-center justify-center mt-4 mb-2 gap-4'>
          <Input
            classNames={{
              base: 'max-w-full px-8 sm:max-w-[51rem] h-10',
              mainWrapper: 'h-full',
              input: 'text-small',
              inputWrapper:
                'h-full font-normal text-default-500 bg-default-400/20 dark:bg-gray-800 border-white-400 dark:border-primary-500/40 rounded-xl'
            }}
            placeholder='Type to search...'
            size='sm'
            startContent={<SearchIcon size={18} />}
            type='search'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {/* <Button
            size='md'
            color='secondary'
            className='cursor-pointer'
            onClick={handleSearch}
          >
            Search
          </Button> */}
        </div>
      </form>
      {!courses.length ? (
        <div className='flex flex-col justify-center items-center h-30'>
          <div className='animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary' />
          <div>Loading...</div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 py-4 mx-auto'>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Courses
