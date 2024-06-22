import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function LessonPage () {
  const { id } = useParams()
  const [lesson, setLesson] = useState(null)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/lessons/${id}`)
        const data = await response.json()
        setLesson(data)
      } catch (error) {
        console.error('Error fetching lesson details:', error)
      }
    }
    fetchLesson()
    return () => {
      // cleanup
    }
  }, [id])

  if (!lesson) {
    return (
      <div className='flex flex-col justify-center items-center h-30'>
        <div className='animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary' />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 px-8 py-4 items-center text-center justify-center max-w-[960px] m-auto'>
      <h1 className='text-center text-4xl font-bold text-secondary py-2'>
        {lesson.title}
      </h1>
      <iframe
        src={`https://player.cloudinary.com/embed/?public_id=${lesson.video_id}&cloud_name=di2m3dhc3&player[posterOptions][transformation][start_offset]=0&player[controls]=true&player[showJumpControls]=true&player[showLogo]=false&player[fluid]=true`}
        width='640'
        height='360'
        allow='autoplay; fullscreen; encrypted-media; picture-in-picture'
        style={{ height: 'auto', width: '100%', aspectRatio: '640 / 360' }}
        allowFullScreen
        frameBorder='0'
      ></iframe>
      <p>{lesson.text_content}</p>
    </div>
  )
}

export default LessonPage
