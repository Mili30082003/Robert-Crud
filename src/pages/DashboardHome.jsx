import React, { useState, useMemo } from 'react'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

const DashboardHome = () => {
  // Datos de ejemplo
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
    { id: 1, nombre: 'Mili Antoni' },
    { id: 2, nombre: 'Facu Silva' }
  ])

  const [fechaFiltro, setFechaFiltro] = useState(new Date().toISOString().slice(0, 10))
  const [turnoFiltro, setTurnoFiltro] = useState('todos')

  // Filtrar pedidos
  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter(p => {
      const fechaPedido = p.fecha.slice(0, 10)
      const matchFecha = fechaPedido === fechaFiltro
      const matchTurno = turnoFiltro === 'todos' || p.turno === turnoFiltro
      return matchFecha && matchTurno
    })
  }, [pedidos, fechaFiltro, turnoFiltro])

  // Total ventas
  const totalVentas = useMemo(() => pedidosFiltrados.reduce((sum, p) => sum + p.total, 0), [pedidosFiltrados])

  // Productos vendidos y ordenados
  const productosVendidos = useMemo(() => {
    const count = {}
    pedidosFiltrados.forEach(pedido => {
      pedido.productos.forEach(prod => {
        count[prod.nombre] = (count[prod.nombre] || 0) + prod.cantidad
      })
    })
    return Object.entries(count).map(([nombre, cantidad]) => ({ nombre, cantidad })).sort((a, b) => b.cantidad - a.cantidad)
  }, [pedidosFiltrados])

  // Ventas por empleado
  const ventasPorEmpleado = useMemo(() => {
    const ventas = {}
    empleados.forEach(emp => { ventas[emp.id] = 0 })
    pedidosFiltrados.forEach(pedido => {
      ventas[pedido.vendedorId] = (ventas[pedido.vendedorId] || 0) + pedido.total
    })
    return empleados.map(emp => ({ nombre: emp.nombre, totalVentas: ventas[emp.id] || 0 }))
  }, [pedidosFiltrados, empleados])

  // Colores para Pie Chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <Container className="my-4">
      <h2 className="mb-4">Dashboard</h2>

      <Form className="mb-4 d-flex gap-3 flex-wrap" style={{ maxWidth: 400 }}>
        <Form.Group>
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            value={fechaFiltro}
            max={new Date().toISOString().slice(0, 10)}
            onChange={e => setFechaFiltro(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Turno</Form.Label>
          <Form.Select value={turnoFiltro} onChange={e => setTurnoFiltro(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="mañana">Mañana</option>
            <option value="noche">Noche</option>
          </Form.Select>
        </Form.Group>
      </Form>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center p-3">
            <Card.Title>Total Ventas</Card.Title>
            <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold', color: '#198754' }}>
              ${totalVentas.toLocaleString()}
            </Card.Text>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Productos Más Vendidos</Card.Header>
            <Card.Body style={{ height: 300 }}>
              {productosVendidos.length === 0 ? (
                <p>No hay ventas para esta fecha/turno.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productosVendidos}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#007bff" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>Ventas por Empleado</Card.Header>
            <Card.Body style={{ height: 300 }}>
              {ventasPorEmpleado.length === 0 ? (
                <p>No hay datos de empleados.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ventasPorEmpleado}
                      dataKey="totalVentas"
                      nameKey="nombre"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {ventasPorEmpleado.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardHome
