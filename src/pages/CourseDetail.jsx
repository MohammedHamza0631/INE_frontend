import React, { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionItem,
  Chip,
  Button,
  Textarea
} from '@nextui-org/react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Cloudinary } from '@cloudinary/url-gen'
import { auto } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { AdvancedImage } from '@cloudinary/react'

function CourseDetail () {
  const { id } = useParams()
  const { user, loggedIn } = useSelector(state => state.user)
  const [courseInfo, setCourseInfo] = useState(null)
  const [cover, setCover] = useState('')
  const [enrolled, setEnrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        const response = await fetch(
          `https://ine-backend.vercel.app/api/courses/${id}`
        )
        const data = await response.json()
        setCourseInfo(data)
        setCover(data.cover)
      } catch (error) {
        console.error('Error fetching course details:', error)
      }
    }
    fetchCourseInfo()
  }, [id])

  const cld = new Cloudinary({ cloud: { cloudName: 'di2m3dhc3' } })
  const img = cld
    .image(`${cover}`)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(800).height(500))

  if (!courseInfo) {
    return (
      <div className='flex justify-center items-center min-h-screen text-gray-100'>
        <div className='animate-spin rounded-full h-24 w-24 border-t-4 border-purple-500'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen py-12 text-gray-100'>
      <h1 className='text-center text-5xl font-extrabold text-purple-400 mb-4'>
        {courseInfo.title}
      </h1>
      <div className='max-w-4xl mx-auto px-4 sm:px-8 py-6 bg-gray-900 shadow-lg rounded-lg'>
        <div className='my-6'>
          <AdvancedImage cldImg={img} className='rounded-xl shadow-lg' />
        </div>
        <p className='text-lg text-gray-300 leading-relaxed'>
          {courseInfo.summary}
        </p>
        <div className='mt-6'>
          <h2 className='text-3xl font-bold text-purple-400 mb-4'>Lessons</h2>
          <Accordion variant='shadow'>
            {courseInfo.lessons.map(lesson => (
              <AccordionItem key={lesson.id} title={lesson.title}>
                {loggedIn && enrolled ? (
                  <div className='flex flex-col'>
                    <iframe
                      src={`https://player.cloudinary.com/embed/?public_id=${lesson.video_id}&cloud_name=di2m3dhc3`}
                      width='100%'
                      height='400'
                      className='rounded-xl shadow-md mb-4'
                      frameBorder='0'
                      allowFullScreen
                    ></iframe>
                    <Textarea
                      isReadOnly
                      className='mb-4'
                      defaultValue={lesson.text_content}
                    />
                  </div>
                ) : (
                  <div className='flex items-center justify-between mb-4'>
                    <Chip color='warning'>Please enroll to view lessons</Chip>
                    <Button
                      color='primary'
                      size='sm'
                      onClick={() => navigate('/courses')}
                    >
                      {loggedIn ? 'Enroll' : 'Login to Enroll'}
                    </Button>
                  </div>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <footer className='mt-8 text-gray-400'>
          <p>Tags: {courseInfo.tags.join(', ')}</p>
        </footer>
      </div>
    </div>
  )
}

export default CourseDetail
