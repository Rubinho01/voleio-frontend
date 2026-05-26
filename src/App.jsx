import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import EditarQuadra from './pages/EditarQuadra/EditarQuadra'
import MinhasReservas from './pages/MinhasReservas/MinhasReservas'
import ReservarQuadra from './pages/ReservarQuadra/ReservarQuadra'
import Quadras from './pages/Quadras/Quadras'
import Cadastro from './pages/Cadastro/Cadastro'
import Dashboard from './pages/Dashboard/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/editar-quadra/:id" element={<EditarQuadra />} />
        <Route path="/reservas" element={<MinhasReservas />} />
        <Route path="/reservar/:id" element={<ReservarQuadra />} />
        <Route path="/quadras" element={<Quadras />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
