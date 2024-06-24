import React, { useState } from 'react'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  Divider
} from '@nextui-org/react'
import { AcmeLogo } from './AcmeLogo.jsx'
import { MenuIcon } from 'lucide-react'
import ModalForm from './ModalForm.jsx'
import { logout } from '../../features/userSlice.js'
export default function Navigation () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
    <>
      <div className='hidden sm:flex'>
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
                <DropdownMenu aria-label='Profile Actions' variant='shadow'>
                  <DropdownItem key='profile' className='h-14 gap-2'>
                    <p className='font-semibold'>Signed in as</p>
                    <p className='font-semibold'>{user.username}</p>
                  </DropdownItem>
                  <DropdownItem key='home'>
                    <NavLink to={'/'}>Home</NavLink>
                  </DropdownItem>
                  <DropdownItem key='courses'>
                    <NavLink to={'/courses'}>Courses</NavLink>
                  </DropdownItem>
                  <DropdownItem key='help_and_feedback'>
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem
                    key='logout'
                    color='danger'
                    onClick={handleLogout}
                  >
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
      </div>
      {/* Mobile Navigation menu */}
      <div className='flex flex-col sm:hidden'>
        <div className='flex items-center justify-between h-15 py-3 px-4 m-0 rounded-lg bg-zinc-950 sm:hidden'>
          <div>
            <AcmeLogo />
            <p className='hidden sm:block font-bold text-inherit'></p>
          </div>
          <div>
            {loggedIn ? (
              <Dropdown placement='center'>
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
                <DropdownMenu aria-label='Profile Actions' variant='shadow'>
                  <DropdownItem key='profile' className='h-14 gap-2'>
                    <p className='font-semibold'>Signed in as</p>
                    <p className='font-semibold'>{user.username}</p>
                  </DropdownItem>
                  <DropdownItem key='home'>
                    <NavLink to={'/'}>Home</NavLink>
                  </DropdownItem>
                  <DropdownItem key='courses'>
                    <NavLink to={'/courses'}>Courses</NavLink>
                  </DropdownItem>
                  <DropdownItem key='help_and_feedback'>
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem
                    key='logout'
                    color='danger'
                    onClick={handleLogout}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <MenuIcon size={32} />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='shadow'>
                  <DropdownItem key='home'>
                    <NavLink to={'/'}>Home</NavLink>
                  </DropdownItem>
                  <DropdownItem key='courses'>
                    <NavLink to={'/courses'}>Courses</NavLink>
                  </DropdownItem>
                  <DropdownItem key='help_and_feedback'>
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key='login' color='secondary'>
                    <Link to='/loginMobile'>Log in</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        </div>
        <Divider />
      </div>
    </>
  )
}
