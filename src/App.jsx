import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import ReservarQuadra from './pages/ReservarQuadra/ReservarQuadra'
import Quadras from './pages/Quadras/Quadras'
import Cadastro from './pages/Cadastro/Cadastro'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservar/:id" element={<ReservarQuadra />} />
        <Route path="/quadras" element={<Quadras />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  )
}
