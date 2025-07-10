import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard/Dashboard" 
import Empleados from "./pages/Empleados"
import Clientes from "./pages/Clientes"
import Pedidos from "./pages/Pedidos"
import Productos from "./pages/Productos"
import Reportes from "./pages/Reportes"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<h2>Bienvenido al Panel Principal</h2>} />
          <Route path="empleados" element={<Empleados />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="productos" element={<Productos />} />
          <Route path="reportes" element={<Reportes />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
