import React from 'react'
import ModalForm from '../components/ui/ModalForm'
function LoginPage () {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-secondary text-3xl mt-2 mb-6'>Login</h1>
      <ModalForm text='Login' />
    </div>
  )
}

export default LoginPage
