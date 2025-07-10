import React, { useState, useMemo } from 'react'
import { Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap'



const Clientes = () => {
    const [clientes, setClientes] = useState([
        { id: 1, nombre: 'Facundo', apellido: 'Silva', direccion: 'Alderetes 222', activo: true },
        { id: 2, nombre: 'Mili', apellido: 'Antoni', direccion: 'Pje Montevideo 2210', activo: true },
        { id: 3, nombre: 'Rodrigo', apellido: 'Toledo', direccion: 'Jujuy 4000', activo: false },
    ])

    const [showModal, setShowModal] = useState(false)
   const [modoEdicion, setModoEdicion] = useState(false)
const [clienteActual, setClienteActual] = useState(null)
const [form, setForm] = useState({ nombre: '', apellido: '', direccion: '' })
const [busqueda, setBusqueda] = useState('')


    const handleClose = () => {
        setShowModal(false)
        setForm({ nombre: '', apellido: '', direccion: '' })
        setModoEdicion(false)
        setClienteActual(null)
    }

    const handleShowAgregar = () => {
        setModoEdicion(false)
        setForm({ nombre: '', apellido: '', direccion: '' })
        setShowModal(true)
    }

    const handleShowEditar = (cliente) => {
        setModoEdicion(true)
        setClienteActual(cliente)
        setForm({ nombre: cliente.nombre, apellido: cliente.apellido, direccion: cliente.direccion })
        setShowModal(true)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleGuardar = () => {
        if (!form.nombre.trim() || !form.apellido.trim() || !form.direccion.trim()) {
            alert('Por favor completa todos los campos')
            return
        }

        if (modoEdicion) {
            setClientes(
                clientes.map((cli) =>
                    cli.id === clienteActual.id ? { ...cli, ...form } : cli
                )
            )
        } else {
            const nuevoId = clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1
            setClientes([...clientes, { id: nuevoId, activo: true, ...form }])
        }
        handleClose()
    }

    const toggleActivo = (id) => {
        setClientes(
            clientes.map((cli) =>
                cli.id === id ? { ...cli, activo: !cli.activo } : cli
            )
        )
        if (clienteActual?.id === id) {
            handleClose()
        }
    }

    // Filtro  de búsqueda por nombre, apellido o dirección 
    const clientesFiltrados = useMemo(() => {
        const term = busqueda.toLowerCase()
        return clientes.filter(
            (cli) =>
                cli.nombre.toLowerCase().includes(term) ||
                cli.apellido.toLowerCase().includes(term) ||
                cli.direccion.toLowerCase().includes(term)
        )
    }, [busqueda, clientes])


    return (
        <div>
            <h2>Gestion de Clientes</h2>

            <InputGroup className='mb-3'>

                <FormControl placeholder='Buscar por nombre, apellido o direccion'
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                ></FormControl>
                <Button variant='success' onClick={handleShowAgregar}>Nuevo Cliente</Button>
            </InputGroup>

<Table striped bordered hover>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Direccion</th>
            <th>Estado</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
         {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((cli) => (
              <tr key={cli.id} style={{ opacity: cli.activo ? 1 : 0.5 }}>
                <td>{cli.id}</td>
                <td>{cli.nombre}</td>
                <td>{cli.apellido}</td>
                <td>{cli.direccion}</td>
                <td>{cli.activo ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowEditar(cli)}
                    disabled={!cli.activo} // solo editar activos
                  >
                    Editar
                  </Button>
                  <Button
                    variant={cli.activo ? 'danger' : 'success'}
                    size="sm"
                    onClick={() => toggleActivo(cli.id)}
                  >
                    {cli.activo ? 'Desactivar' : 'Activar'}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No hay clientes
              </td>
            </tr>
          )}
    </tbody>
</Table>


  {/* Modal para crear/editar cliente */}
  <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? 'Editar Cliente' : 'Nuevo Cliente'}</Modal.Title>
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
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
              />
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

export default Clientes
