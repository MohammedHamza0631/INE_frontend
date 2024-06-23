import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/userSlice.js'
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
  Link
} from '@nextui-org/react'
import { MailIcon } from './MailIcon.jsx'
import { LockIcon } from './LockIcon.jsx'
import RegisterForm from './RegisterForm.jsx'
export default function ModalForm ({ text }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'https://ine-backend-u216.onrender.com/api/auth/login',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        },
        { withCredentials: true }
      )
      console.log(response.data)
      if (response.status !== 200) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Registration Failed')
      } else if (response.status === 200) {
        const userInfo = await response.data
        // console.log(userInfo)
        localStorage.setItem('token', userInfo.token)
        toast.success('You are Logged In!', {
          style: {
            background: '#333',
            color: '#fff'
          }
        })
        // Close the modal before going to courses page
        onOpenChange()
        dispatch(setUser(userInfo))
        navigate('/courses') // Set redirect to true
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
  return (
    <>
      <Button onPress={onOpen} color='secondary' variant='ghost'>
        {text}
      </Button>
      <Modal
        isOpen={isOpen}
        backdrop='blur'
        onOpenChange={onOpenChange}
        placement='top-center'
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
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
                <Button color='secondary' onClick={login}>
                  Log in
                </Button>
              </ModalFooter>
              <div className='flex  gap-4 items-center justify-center py-2'>
                Don't have an account? <RegisterForm text='Sign Up' />
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
