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
  const { id } = useParams() // course id
  const { user, loggedIn } = useSelector(state => state.user)
  const [courseInfo, setCourseInfo] = useState(null)
  const [cover, setCover] = useState('')
  const [enrolled, setEnrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        // Fetch the course details by id
        const response = await fetch(
          `https://ine-backend-u216.onrender.com/api/courses/${id}`
        )
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
        if (user && loggedIn) {
          const userId = user.id
          const response = await fetch(
            `https://ine-backend-u216.onrender.com/api/enrollments/status/${userId}/${id}`
          )
          const data = await response.json()
          setEnrolled(data.enrolled)
        }
      } catch (error) {
        console.error('Error checking enrollment status:', error)
      }
    }
    checkEnrollment()
  }, [id, user, loggedIn])

  const handleEnroll = async () => {
    try {
      if (!loggedIn) {
        return navigate('/courses')
      }

      const userId = user.id
      await fetch('https://ine-backend-u216.onrender.com/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, courseId: id })
      })
      setEnrolled(true)
    } catch (error) {
      console.error('Error enrolling in course:', error)
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
                <div>
                  {loggedIn ? (
                    enrolled ? (
                      <div className='flex flex-col items-center justify-center'>
                        {/* <p className=''>{lesson.text_content}</p>
                        <Link to={`/lessons/${lesson.id}`} className=''>
                          <Button color='secondary' variant='ghost'>
                            View Lesson
                          </Button>
                        </Link> */}
                        <iframe
                          src={`https://player.cloudinary.com/embed/?public_id=${lesson.video_id}&cloud_name=di2m3dhc3&player[posterOptions][transformation][start_offset]=0&player[controls]=true&player[showJumpControls]=true&player[showLogo]=false&player[fluid]=true`}
                          width='640'
                          height='360'
                          allow='autoplay; fullscreen; encrypted-media; picture-in-picture'
                          style={{
                            height: 'auto',
                            width: '100%',
                            aspectRatio: '640 / 360'
                          }}
                          allowFullScreen
                          frameBorder='0'
                          className='mb-4 border-1 rounded-xl border-gray-200'
                        ></iframe>
                        <Textarea
                          isReadOnly
                          className='w-full mb-4 mt-2'
                          defaultValue={lesson.text_content}
                        />
                      </div>
                    ) : (
                      <div className='mb-4 flex items-center justify-between'>
                        <Chip radius='sm' color='warning' variant='shadow'>
                          Please enroll to view lessons
                        </Chip>
                        <Button
                          color='warning'
                          variant='ghost'
                          size='sm'
                          onPress={handleEnroll}
                        >
                          Enroll
                        </Button>
                      </div>
                    )
                  ) : (
                    <div className='mb-4'>
                      <Chip radius='sm' color='warning' variant='shadow'>
                        Please Login to view lessons
                      </Chip>
                    </div>
                  )}
                </div>
                {/* <Link to={`/lessons/${lesson.id}`}>
                  <p className=' text-blue-400'>{lesson.text_content}</p>
                </Link> */}
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
