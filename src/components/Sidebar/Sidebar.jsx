import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Sidebar.css' 

const Sidebar = () => {
  return (
    <>
    <div className='sidebar bg-dark text-white p-3'>
      <h4 className='text-center'>Sistema Robert</h4>
      <hr/>
       <Nav defaultActiveKey="/dashboard" className="flex-column">
        <Nav.Link as={Link} to="/dashboard" className="text-white">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/dashboard/empleados" className="text-white">Empleados</Nav.Link>
        <Nav.Link as={Link} to="/dashboard/clientes" className="text-white">Clientes</Nav.Link>
        <Nav.Link as={Link} to="/dashboard/pedidos" className="text-white">Pedidos</Nav.Link>
        <Nav.Link as={Link} to="/dashboard/productos" className="text-white">Productos</Nav.Link>
        <Nav.Link as={Link} to="/dashboard/reportes" className="text-white">Reportes</Nav.Link>
        <Nav.Link as={Link} to="/" className="text-white mt-3">Cerrar sesión</Nav.Link>
      </Nav>
    </div>
    </>
  )
}

export default Sidebar
