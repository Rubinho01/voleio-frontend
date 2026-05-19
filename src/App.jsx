import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import EditarQuadra from './pages/EditarQuadra/EditarQuadra'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/editar-quadra/:id" element={<EditarQuadra />} />
      </Routes>
    </BrowserRouter>
  )
}
