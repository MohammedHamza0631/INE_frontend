import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Chip
} from '@nextui-org/react'
import { MailIcon } from './MailIcon.jsx'
import { LockIcon } from './LockIcon.jsx'

export default function RegisterForm ({ text }) {
  const navigate = useNavigate()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const register = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          username,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        },
        { withCredentials: true }
      )

      console.log(response.data)
      if (response.status !== 201) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Registration Failed')
      } else {
        toast.success('You are Registered! Now Login', {
          style: {
            background: '#333',
            color: '#fff'
          }
        })
        // close model before going to login
        onOpenChange()
        navigate('/') // Set redirect to true
      }
    } catch (error) {
      console.error('Registration Error:', error)
      toast.error('Registration failed. Please try again.', {
        style: {
          background: '#333',
          color: '#fff'
        }
      })
    }
  }
  // if (redirect) {
  //   return <Navigate to={'/courses'} /> // Redirect to home page
  // }
  return (
    <>
      <Chip color='secondary' radius='sm' variant='shadow' onClick={onOpen}>
        {text}
      </Chip>
      <Modal
        isOpen={isOpen}
        backdrop='blur'
        onOpenChange={onOpenChange}
        placement='top-center'
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Sign Up</ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                  }
                  label='Username'
                  placeholder='Enter your username'
                  variant='bordered'
                  onChange={e => setUsername(e.target.value)}
                />
                <Input
                  endContent={
                    <LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                  }
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  variant='bordered'
                  onChange={e => setPassword(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button color='secondary' onClick={register}>
                  Sign up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
