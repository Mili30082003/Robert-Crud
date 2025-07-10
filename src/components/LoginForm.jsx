import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ onLogin }) => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin({ name, password })
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} className='p-4 border rounded bg-light shadow-sm'>
                <h3 className='mb-3'>Iniciar Sesión</h3>

                <Form.Group className='mb-3'>
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control type='text' placeholder='Usuario' value={name} onChange={(e) => setName(e.target.value)} required></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type='password' placeholder='Contraseña' value={password} onChange={(e) => setImmediate(e.target.value)} required></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Entrar
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm
