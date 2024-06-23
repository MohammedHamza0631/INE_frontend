import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  Chip,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button
} from '@nextui-org/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { auto } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { AdvancedImage } from '@cloudinary/react'

export default function CourseCard ({ course }) {
  const cld = new Cloudinary({ cloud: { cloudName: 'di2m3dhc3' } })
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image(`${course.cover}`)
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500).height(500)) // Transform the image: auto-crop to square aspect_ratio
  return (
    <div>
      <Card
        isFooterBlurred
        className='w-full h-[300px] col-span-12 sm:col-span-7'
      >
        <CardHeader className='absolute z-10 top-1 flex-col items-start'>
          <p className='text-tiny text-white/60 uppercase font-bold'></p>
          <h4 className='text-white/90 font-medium text-xl'>{course.title}</h4>
        </CardHeader>
        {/* <Image
          removeWrapper
          alt='Relaxing app background'
          className='z-0 w-full h-full object-cover'
          src={course.cover + `.jpeg`}
        /> */}
        <Link to={`/courses/${course.id}`}>
          <AdvancedImage cldImg={img} />
        </Link>

        <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
          <div className='flex flex-grow gap-2 items-center justify-center'>
            <div className='flex items-center justify-center gap-4'>
              {course.tags.map((tag, index) => (
                <Chip key={index} size='sm' color='primary'>
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
