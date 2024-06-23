import React, { useState, useEffect } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { useParams, Link } from 'react-router-dom'
import { Cloudinary } from '@cloudinary/url-gen'
import { auto } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { AdvancedImage } from '@cloudinary/react'
function CourseDetail () {
  const { id } = useParams()
  const [courseInfo, setCourseInfo] = useState(null)
  const [cover, setCover] = useState('')
  const [enrolled, setEnrolled] = useState(false)
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') === null ? false : true
  )

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        // Fetch the course details by id
        const response = await fetch(`http://localhost:5000/api/courses/${id}`)
        const data = await response.json()
        setCourseInfo(data)
        setCover(data.cover)
      } catch (error) {
        console.error('Error fetching course details:', error)
      }
    }
    fetchCourseInfo()
    return () => {
      // cleanup
    }
  }, [id])

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const userId = parseJwt(token).userId
          const response = await fetch(`http://localhost:5000/api/enrollments/status/${userId}/${id}`)
          const data = await response.json()
          setEnrolled(data.enrolled)
        }
      } catch (error) {
        console.error('Error checking enrollment status:', error)
      }
    }
    checkEnrollment()
  }, [id])

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }
  const cld = new Cloudinary({ cloud: { cloudName: 'di2m3dhc3' } })
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image(`${cover}`)
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(800).height(500)) // Transform the image: auto-crop to square aspect_ratio
  if (!courseInfo) {
    return (
      <div className='flex flex-col justify-center items-center h-30'>
        <div className='animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary' />
      </div>
    )
  }
  return (
    <>
      <h1 className='text-center text-5xl font-bold text-secondary py-2'>
        {courseInfo.title}
      </h1>
      <div className='flex flex-col gap-4 px-8 py-4 items-center text-center justify-center max-w-[960px] m-auto'>
        <div className=' my-8'>
          <AdvancedImage cldImg={img} />
        </div>
        <div>
          <p>{courseInfo.summary}</p>
        </div>
        <div className='w-full'>
          <h2 className='text-center text-4xl font-bold text-secondary py-2'>
            Lessons:
          </h2>
          <Accordion variant='shadow'>
            {courseInfo.lessons.map(lesson => (
              <AccordionItem
                key={lesson.id}
                aria-label={lesson.title}
                title={lesson.title}
              >
                <Link to={`/lessons/${lesson.id}`}>
                  <p className=' text-blue-400'>{lesson.text_content}</p>
                </Link>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <footer className='text-white'>
          <p>Tags: {courseInfo.tags.join(', ')}</p>
        </footer>
      </div>
    </>
  )
}

export default CourseDetail
