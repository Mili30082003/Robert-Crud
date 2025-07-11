import React, {useState, useMemo} from 'react'
import { Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap'

const Productos = () => {
const [productos, setProductos] = useState([
  {id: 1, nombre:'Producto 1', descripcion: 'Descripción del producto 1', precio: 100, stock: 10, activo: true},
   {id: 2, nombre:'Producto 2', descripcion: 'Descripción del producto 2', precio: 100, stock: 10, activo: false}
])

const [showModal, setShowModal] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [productoActual, setProductoActual] = useState(null)
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', stock: '' })
  const [busqueda, setBusqueda] = useState('')

  const handleClose = () => {
    setShowModal(false)
    setForm({ nombre: '', descripcion: '', precio: '', stock: '' })
    setModoEdicion(false)
    setProductoActual(null)
  }

  const handleShowAgregar = () => {
    setModoEdicion(false)
    setForm({ nombre: '', descripcion: '', precio: '', stock: '' })
    setShowModal(true)
  }

  const handleShowEditar = (producto) => {
    setModoEdicion(true)
    setProductoActual(producto)
    setForm({ 
      nombre: producto.nombre, 
      descripcion: producto.descripcion, 
      precio: producto.precio, 
      stock: producto.stock 
    })
    setShowModal(true)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleGuardar = () => {
    if (!form.nombre || !form.descripcion || !form.precio || !form.stock) {
      alert('Completá todos los campos')
      return
    }

    const nuevoProducto = {
      ...form,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock)
    }

    if (modoEdicion) {
      setProductos(
        productos.map(p => 
          p.id === productoActual.id ? { ...p, ...nuevoProducto } : p
        )
      )
    } else {
      const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1
      setProductos([...productos, { id: nuevoId, activo: true, ...nuevoProducto }])
    }

    handleClose()
  }

  const toggleActivo = (id) => {
    setProductos(productos.map(p => p.id === id ? { ...p, activo: !p.activo } : p))
  }

  const productosFiltrados = useMemo(() => {
    const term = busqueda.toLowerCase()
    return productos.filter(p =>
      p.nombre.toLowerCase().includes(term) ||
      p.descripcion.toLowerCase().includes(term)
    )
  }, [busqueda, productos])


  return (
    <div>
      <h2>Gestion de Productos</h2>(

    <InputGroup className='mb-3'>
      <FormControl placeholder='Buscar por nombre o descripcion' value={busqueda} onChange={e => setBusqueda(e.target.value)}></FormControl>
    
    <Button variant='success' onClick={handleShowAgregar}> Nuevo Producto </Button>
    </InputGroup>


 <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio ($)</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map(p => (
              <tr key={p.id} style={{ opacity: p.activo ? 1 : 0.5 }}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>{p.precio}</td>
                <td>{p.stock}</td>
                <td>{p.activo ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowEditar(p)}
                    disabled={!p.activo}
                  >
                    Editar
                  </Button>
                  <Button
                    variant={p.activo ? 'danger' : 'success'}
                    size="sm"
                    onClick={() => toggleActivo(p.id)}
                  >
                    {p.activo ? 'Desactivar' : 'Activar'}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7" className="text-center">No hay productos</td></tr>
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
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
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock inicial</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={form.stock}
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

export default Productos
