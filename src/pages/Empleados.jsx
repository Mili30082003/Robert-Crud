import React, { useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'

const Empleados = () => {
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Pérez', rol: 'cocinero' },
    { id: 2, nombre: 'Ana', apellido: 'Gómez', rol: 'administrador' }
  ])

  const [showModal, setShowModal] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [empleadoActual, setEmpleadoActual] = useState(null)
  const [form, setForm] = useState({ nombre: '', apellido: '', rol: 'empleado' })

  const handleClose = () => {
    setShowModal(false)
    setForm({ nombre: '', apellido: '', rol: 'empleado' })
    setModoEdicion(false)
    setEmpleadoActual(null)
  }

  const handleShowAgregar = () => {
    setModoEdicion(false)
    setForm({ nombre: '', apellido: '', rol: 'empleado' })
    setShowModal(true)
  }

  const handleShowEditar = (empleado) => {
    setModoEdicion(true)
    setEmpleadoActual(empleado)
    setForm({ nombre: empleado.nombre, apellido: empleado.apellido, rol: empleado.rol })
    setShowModal(true)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleGuardar = () => {
    if (modoEdicion) {
      const empleadosActualizados = empleados.map(emp =>
        emp.id === empleadoActual.id ? { ...emp, ...form } : emp
      )
      setEmpleados(empleadosActualizados)
    } else {
      const nuevoEmpleado = {
        ...form,
        id: empleados.length > 0 ? empleados[empleados.length - 1].id + 1 : 1
      }
      setEmpleados([...empleados, nuevoEmpleado])
    }
    handleClose()
  }

  const handleEliminar = (id) => {
    const confirmacion = confirm("¿Estás seguro que querés eliminar este empleado?")
    if (confirmacion) {
      const filtrados = empleados.filter(emp => emp.id !== id)
      setEmpleados(filtrados)
    }
  }

  return (
    <div>
      <h2>Empleados</h2>
      <Button variant="success" className="mb-3" onClick={handleShowAgregar}>
        Agregar Empleado
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.nombre}</td>
              <td>{emp.apellido}</td>
              <td>{emp.rol}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowEditar(emp)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminar(emp.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar/editar */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? 'Editar Empleado' : 'Nuevo Empleado'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Select name="rol" value={form.rol} onChange={handleChange}>
                <option value="administrador">Administrador</option>
                <option value="cocinero">Cocinero</option>
                <option value="empleado">Empleado</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleGuardar}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Empleados
