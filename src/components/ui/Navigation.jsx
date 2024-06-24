import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button
} from '@nextui-org/react'
import { AcmeLogo } from './AcmeLogo.jsx'
import { SearchIcon } from './SearchIcon.jsx'
import ModalForm from './ModalForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import { logout } from '../../features/userSlice.js'
import axios from 'axios'
import Courses from '../../pages/Courses.jsx'
export default function Navigation () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const { user, loggedIn } = useSelector(state => state.user)
  // const logout = () => {
  //   setLoggedIn(false)
  //   setUser({})
  //   localStorage.removeItem('token')
  //   navigate('/')
  // }

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    navigate('/')
  }

  return (
    <Navbar isBordered>
      <NavbarContent justify='start'>
        <NavbarBrand className='mr-4'>
          <AcmeLogo />
          <p className='hidden sm:block font-bold text-inherit'></p>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-10'>
          <NavbarItem>
            <NavLink color='foreground' to='/'>
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem isActive>
            <NavLink to='/courses' aria-current='page'>
              <div className='text-secondary'>Courses</div>
            </NavLink>
          </NavbarItem>
          {/* <NavbarItem>
            <Link color='foreground' href='#'>
              My Courses
            </Link>
          </NavbarItem> */}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as='div' className='items-center' justify='end'>
        {loggedIn ? (
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                isBordered
                as='button'
                className='transition-transform'
                color='secondary'
                name='Jason Hughes'
                size='sm'
                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem key='profile' className='h-14 gap-2'>
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>{user.username}</p>
              </DropdownItem>
              <DropdownItem key='analytics'>Profile</DropdownItem>
              <DropdownItem key='courses'>My Courses</DropdownItem>
              <DropdownItem key='help_and_feedback'>
                Help & Feedback
              </DropdownItem>
              <DropdownItem key='logout' color='danger' onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarContent justify='end'>
            <NavbarItem>
              <ModalForm text='Login' />
            </NavbarItem>
          </NavbarContent>
        )}
      </NavbarContent>
    </Navbar>
  )
}
