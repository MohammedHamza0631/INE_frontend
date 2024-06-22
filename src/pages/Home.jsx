import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Home () {
  //Course Management: /api/courses to get all courses
  //
  return (
    <div>
      <h1 className='text-center text-5xl py-8'>Welcome to Edupoint</h1>
      <p className='text-center text-3xl py-8'>
        The best place to learn and grow
      </p>
      <p className='text-center text-2xl py-8'>
        Browse our <Link to={"/courses"} className='underline text-secondary-600'>courses</Link> to get started!
      </p>
    </div>
  )
}

export default Home
