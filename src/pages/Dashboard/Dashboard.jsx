import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import DashboardHome from '../DashboardHome'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div className='content'>
        <Outlet />
        {/* Aquí se renderizarán las rutas hijas del Dashboard */}
        {/* Por ejemplo: Empleados, Clientes, Pedidos, etc. */}
        <DashboardHome />
      </div>
    </div>
  )
}

export default Dashboard
