import React, { useState} from 'react'
import { Form, Button } from 'react-bootstrap'

const RegisterForm = ({ onRegister }) => {
    const [form, setForm] = useState ({
        name: '',
        password: '',
        role: 'empleado'
})

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onRegister(form)
    }

  return (
    <div>
      <Form onSubmit={handleSubmit} className='p-4 border rounded bg-light shadow-sm'>
        <h3 className='mb-3'>Registro</h3>
         <Form.Group className="mb-3">
        <Form.Label>Nombre de usuario</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Usuario"
          value={form.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Rol</Form.Label>
        <Form.Select name="role" value={form.role} onChange={handleChange}>
          <option value="administrador">Administrador</option>
          <option value="cocinero">Cocinero</option>
          <option value="empleado">Empleado</option>
        </Form.Select>
      </Form.Group>

      <Button variant="success" type="submit" className="w-100">
        Registrarse
      </Button>
      </Form>
    </div>
  )
}

export default RegisterForm
