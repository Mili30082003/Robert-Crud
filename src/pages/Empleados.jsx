import React, { useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'

const Empleados = () => {
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: 'Florencia', apellido: 'Solis', rol: 'cocinero', activo: true },
    { id: 2, nombre: 'Milagros', apellido: 'Antoni', rol: 'administrador', activo: true }
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
    if (!form.nombre.trim() || !form.apellido.trim() || !form.rol.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    if (modoEdicion) {
      const empleadosActualizados = empleados.map(emp =>
        emp.id === empleadoActual.id ? { ...emp, ...form } : emp
      )
      setEmpleados(empleadosActualizados)
    } else {
      const nuevoEmpleado = {
        ...form,
        id: empleados.length > 0 ? empleados[empleados.length - 1].id + 1 : 1,
        activo: true
      }
      setEmpleados([...empleados, nuevoEmpleado])
    }
    handleClose()
  }

  const toggleActivo = (id) => {
    setEmpleados(
      empleados.map(emp =>
        emp.id === id ? { ...emp, activo: !emp.activo } : emp
      )
    )
    // Si estaba editando ese empleado y cambió estado, cancelar edición
    if (empleadoActual?.id === id) {
      handleClose()
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
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length > 0 ? (
            empleados.map(emp => (
              <tr key={emp.id} style={{ opacity: emp.activo ? 1 : 0.5 }}>
                <td>{emp.id}</td>
                <td>{emp.nombre}</td>
                <td>{emp.apellido}</td>
                <td>{emp.rol}</td>
                <td>{emp.activo ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowEditar(emp)}
                    disabled={!emp.activo} // solo editar activos
                  >
                    Editar
                  </Button>
                  <Button
                    variant={emp.activo ? 'danger' : 'success'}
                    size="sm"
                    onClick={() => toggleActivo(emp.id)}
                  >
                    {emp.activo ? 'Desactivar' : 'Activar'}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No hay empleados
              </td>
            </tr>
          )}
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
                autoFocus
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
