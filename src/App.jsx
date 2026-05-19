import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import ReservarQuadra from './pages/ReservarQuadra/ReservarQuadra'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservar/:id" element={<ReservarQuadra />} />
      </Routes>
    </BrowserRouter>
  )
}
