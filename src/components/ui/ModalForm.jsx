import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
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

export default function ModalForm ({ text, loggedIn, setLoggedIn, setUser }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
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
        console.log(userInfo)
        localStorage.setItem('token', userInfo.token)
        toast.success('You are Logged In!', {
          style: {
            background: '#333',
            color: '#fff'
          }
        })
        // Close the modal before going to courses page
        onOpenChange()
        setUser(userInfo)
        setLoggedIn(true)
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
                <Button color='primary' onClick={login}>
                  Log in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
