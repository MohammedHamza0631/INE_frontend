import React from 'react'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'

function Home () {
  return (
    <div className='flex flex-col items-center justify-center text-gray-100 '>
      <div className='text-center space-y-6'>
        <h1 className='text-5xl md:text-7xl font-extrabold text-purple-400'>
          Welcome to <span className='text-purple-600'>Edupoint</span>
        </h1>
        <div className='text-2xl md:text-4xl'>
          <Typewriter
            options={{
              strings: [
                'Unlock Your Potential',
                'Upskill Yourself with the Best Courses',
                'Learn, Grow, and Succeed with Us'
              ],
              autoStart: true,
              loop: true,
              delay: 75
            }}
          />
        </div>
        <p className='text-lg md:text-xl max-w-2xl mx-auto text-gray-400'>
          Discover a range of courses designed to help you achieve your learning
          goals, from beginner to advanced levels. Whether you're looking to
          gain new skills or deepen your expertise, we've got you covered.
        </p>
        <div>
          <Link
            to='/courses'
            className='bg-purple-600 text-white  px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl'
          >
            Browse Courses
          </Link>
        </div>
      </div>

      <div className='mt-16 space-y-10 px-4 md:px-20'>
        <section className='text-center'>
          <h2 className='text-3xl md:text-5xl font-bold text-purple-400 mb-4'>
            Why Choose <span className='text-purple-600'>Edupoint</span>?
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
              <h3 className='text-xl font-semibold text-purple-400'>
                Expert Instructors
              </h3>
              <p className='text-gray-400 mt-2'>
                Learn from industry experts with years of experience and
                practical knowledge.
              </p>
            </div>
            <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
              <h3 className='text-xl font-semibold text-purple-400'>
                Flexible Learning
              </h3>
              <p className='text-gray-400 mt-2'>
                Access courses at your own pace, anytime and anywhere.
              </p>
            </div>
            <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
              <h3 className='text-xl font-semibold text-purple-400'>
                Career Growth
              </h3>
              <p className='text-gray-400 mt-2'>
                Boost your career with new skills and certifications from our
                courses.
              </p>
            </div>
          </div>
        </section>

        <section className='text-center'>
          <h2 className='text-3xl md:text-5xl font-bold text-purple-400 mb-4'>
            Popular Courses
          </h2>
          <p className='text-lg text-gray-400 mb-8'>
            Explore our most sought-after courses that are helping students
            around the world achieve their dreams.
          </p>
          <div className='flex justify-center'>
            <Link
              to='/courses'
              className='bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl'
            >
              View All Courses
            </Link>
          </div>
        </section>

        <section className='bg-gray-800 p-8 rounded-lg shadow-lg text-center'>
          <h2 className='text-2xl md:text-4xl font-bold text-purple-400'>
            Join the <span className='text-purple-600'>Edupoint</span> Community
          </h2>
          <p className='text-gray-400 mt-4'>
            Sign up today and start your journey toward success. Become a part
            of a thriving community of learners!
          </p>
          <Link
            to='/loginMobile'
            className='bg-purple-600 text-white px-8 py-3 mt-6 inline-block rounded-lg shadow-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl'
          >
            Get Started Now
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Home
