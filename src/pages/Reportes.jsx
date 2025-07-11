import React, { useState, useMemo } from 'react'
import { Table, Form, Row, Col, Alert } from 'react-bootstrap'

const Reportes = () => {
  const [pedidos] = useState([
    {
      id: 1,
      fecha: '2025-07-11T08:30:00',
      turno: 'mañana',
      productos: [
        { nombre: 'Producto 1', cantidad: 3 },
        { nombre: 'Producto 2', cantidad: 1 }
      ],
      vendedorId: 1,
      total: 300,
    },
    {
      id: 2,
      fecha: '2025-07-11T19:15:00',
      turno: 'noche',
      productos: [
        { nombre: 'Producto 1', cantidad: 1 },
        { nombre: 'Producto 2', cantidad: 2 }
      ],
      vendedorId: 2,
      total: 250,
    },
    {
      id: 3,
      fecha: '2025-07-10T09:00:00',
      turno: 'mañana',
      productos: [
        { nombre: 'Producto 2', cantidad: 4 },
      ],
      vendedorId: 1,
      total: 400,
    },
  ])

  const [empleados] = useState([
    { id: 1, nombre: 'Flor Solis' },
    { id: 2, nombre: 'Facu Silva' }
  ])

  const [fechaReporte, setFechaReporte] = useState(new Date().toISOString().slice(0, 10))
  const [turnoFiltro, setTurnoFiltro] = useState('todos')

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter(p => {
      const fechaPedido = p.fecha.slice(0, 10)
      const matchFecha = fechaPedido === fechaReporte
      const matchTurno = turnoFiltro === 'todos' || p.turno === turnoFiltro
      return matchFecha && matchTurno
    })
  }, [pedidos, fechaReporte, turnoFiltro])

  const totalVentas = useMemo(() => {
    return pedidosFiltrados.reduce((sum, p) => sum + p.total, 0)
  }, [pedidosFiltrados])

  const productosVendidos = useMemo(() => {
    const contador = {}
    pedidosFiltrados.forEach(pedido => {
      pedido.productos.forEach(prod => {
        contador[prod.nombre] = (contador[prod.nombre] || 0) + prod.cantidad
      })
    })
    return contador
  }, [pedidosFiltrados])

  const productosOrdenados = useMemo(() => {
    const arr = Object.entries(productosVendidos).map(([nombre, cantidad]) => ({ nombre, cantidad }))
    arr.sort((a, b) => b.cantidad - a.cantidad)
    return arr
  }, [productosVendidos])

  const ventasPorEmpleado = useMemo(() => {
    const ventas = {}
    empleados.forEach(emp => (ventas[emp.id] = 0))
    pedidosFiltrados.forEach(pedido => {
      ventas[pedido.vendedorId] = (ventas[pedido.vendedorId] || 0) + pedido.total
    })
    return ventas
  }, [pedidosFiltrados, empleados])

  const empleadosOrdenados = useMemo(() => {
    const arr = empleados.map(emp => ({
      nombre: emp.nombre,
      totalVentas: ventasPorEmpleado[emp.id] || 0,
    }))
    arr.sort((a, b) => b.totalVentas - a.totalVentas)
    return arr
  }, [ventasPorEmpleado, empleados])

  return (
    <div className="p-4">
      <h2 className="mb-4">Reporte de Ventas</h2>

      <Form as={Row} className="mb-4 align-items-center" style={{ maxWidth: 500 }}>
        <Form.Group as={Col} xs="6" controlId="fechaReporte">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            value={fechaReporte}
            onChange={e => setFechaReporte(e.target.value)}
            max={new Date().toISOString().slice(0, 10)}
          />
        </Form.Group>

        <Form.Group as={Col} xs="6" controlId="turnoFiltro">
          <Form.Label>Turno</Form.Label>
          <Form.Select value={turnoFiltro} onChange={e => setTurnoFiltro(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="mañana">Mañana</option>
            <option value="noche">Noche</option>
          </Form.Select>
        </Form.Group>
      </Form>

      <h4>
        Total de Ventas: <span className="text-success">${totalVentas.toLocaleString()}</span>
      </h4>

      <section className="mt-4">
        <h5>Productos Más Vendidos</h5>
        {productosOrdenados.length === 0 ? (
          <Alert variant="warning">No hay ventas en esta fecha y turno.</Alert>
        ) : (
          <Table striped bordered hover responsive style={{ maxWidth: 600 }}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad Vendida</th>
              </tr>
            </thead>
            <tbody>
              {productosOrdenados.map((p, i) => (
                <tr key={i}>
                  <td>{p.nombre}</td>
                  <td>{p.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </section>

      <section className="mt-5">
        <h5>Rendimiento de Empleados</h5>
        {empleadosOrdenados.length === 0 ? (
          <Alert variant="warning">No hay datos de empleados.</Alert>
        ) : (
          <Table striped bordered hover responsive style={{ maxWidth: 600 }}>
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Total Ventas ($)</th>
              </tr>
            </thead>
            <tbody>
              {empleadosOrdenados.map((e, i) => (
                <tr key={i}>
                  <td>{e.nombre}</td>
                  <td>{e.totalVentas.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </section>
    </div>
  )
}

export default Reportes
