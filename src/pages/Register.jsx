import React from 'react'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
    const handleRegister = (data) => {
        console.log('Datos de registro', data)
        alert(`Usuario registrado: ${data.name} como ${data.role}`)
    }
  return (
    <>
    <div className='container mt-5'>
      <RegisterForm onRegister={handleRegister}></RegisterForm>
    </div>
    </>
  )
}

export default Register
