import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap'

const Pedidos = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Facundo Silva', direccion: 'Alderetes 222' },
    { id: 2, nombre: 'Milagros Antoni', direccion: 'Pje Montevideo 2210' }
  ])

  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto 1', stock:  10},
    { id: 2, nombre: 'Pollo', stock: 20 }
  ])

  // Leer pedidos guardados en localStorage o inicializar vacio
  const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos') || '[]')
  const [pedidos, setPedidos] = useState(pedidosGuardados)
  
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ clienteId: '', productos: [] })
  const [productoSeleccionado, setProductoSeleccionado] = useState({ productoId: '', cantidad: '' })

  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos))
  }, [pedidos])

  const handleShow = () => {
    setForm({ clienteId: '', productos: [] })
    setProductoSeleccionado({ productoId: '', cantidad: '' })
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleChangeCliente = (e) => {
    setForm({ ...form, clienteId: e.target.value })
  }

  const handleAgregarProducto = () => {
    const { productoId, cantidad } = productoSeleccionado
    const producto = productos.find(p => p.id === parseInt(productoId))
    const cantidadNum = parseInt(cantidad)

    if (!producto || !cantidadNum || cantidadNum <= 0) return

    if (producto.stock < cantidadNum) {
      alert('No hay stock suficiente')
      return
    }

    const yaAgregado = form.productos.find(p => p.productoId === producto.id)
    if (yaAgregado) {
      alert('Producto ya agregado al pedido')
      return
    }

    setForm({
      ...form,
      productos: [...form.productos, { productoId: producto.id, nombre: producto.nombre, cantidad: cantidadNum }]
    })

    setProductoSeleccionado({ productoId: '', cantidad: '' })
  }

  const handleGuardarPedido = () => {
    const cliente = clientes.find(c => c.id === parseInt(form.clienteId))
    if (!cliente || form.productos.length === 0) {
      alert('Faltan datos del cliente o productos')
      return
    }

    // Descontar stock
    const nuevosProductos = productos.map(p => {
      const productoPedido = form.productos.find(prod => prod.productoId === p.id)
      if (productoPedido) {
        return { ...p, stock: p.stock - productoPedido.cantidad }
      }
      return p
    })
    setProductos(nuevosProductos)

    const nuevoPedido = {
      id: pedidos.length + 1,
      clienteNombre: cliente.nombre,
      direccion: cliente.direccion,
      productos: form.productos,
      estado: 'pendiente',
      fecha: new Date().toLocaleDateString()
    }
    setPedidos([...pedidos, nuevoPedido])
    handleClose()
  }

  const cambiarEstado = (id, nuevoEstado) => {
    setPedidos(pedidos.map(p =>
      p.id === id ? { ...p, estado: nuevoEstado } : p
    ))
  }

  return (
    <div>
      <h2>Historial de Pedidos</h2>
      <Button onClick={handleShow} variant="success" className="mb-3">
        Nuevo Pedido
      </Button>

      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Dirección</th>
            <th>Productos</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.clienteNombre}</td>
              <td>{p.direccion}</td>
              <td>
                {p.productos.map(prod => (
                  <div key={prod.productoId}>{prod.nombre} x{prod.cantidad}</div>
                ))}
              </td>
              <td>{p.estado}</td>
              <td>{p.fecha}</td>
              <td>
                <Button
                  variant={p.estado === 'pendiente' ? 'primary' : 'outline-primary'}
                  size="sm"
                  className="me-2"
                  onClick={() => cambiarEstado(p.id, 'pendiente')}
                >
                  Pendiente
                </Button>
                <Button
                  variant={p.estado === 'entregado' ? 'success' : 'outline-success'}
                  size="sm"
                  onClick={() => cambiarEstado(p.id, 'entregado')}
                >
                  Entregado
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Select value={form.clienteId} onChange={handleChangeCliente}>
                <option value="">Seleccionar cliente</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" value={clientes.find(c => c.id === parseInt(form.clienteId))?.direccion || ''} disabled />
            </Form.Group>

            <Row className="align-items-end">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Producto</Form.Label>
                  <Form.Select
                    value={productoSeleccionado.productoId}
                    onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, productoId: e.target.value })}
                  >
                    <option value="">Seleccionar producto</option>
                    {productos.map(p => (
                      <option key={p.id} value={p.id}>{p.nombre} (Stock: {p.stock})</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="number"
                    value={productoSeleccionado.cantidad}
                    onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, cantidad: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Button variant="primary" onClick={handleAgregarProducto}>Agregar</Button>
              </Col>
            </Row>

            {form.productos.length > 0 && (
              <Table bordered size="sm">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {form.productos.map(p => (
                    <tr key={p.productoId}>
                      <td>{p.nombre}</td>
                      <td>{p.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleGuardarPedido}>Confirmar Pedido</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Pedidos
