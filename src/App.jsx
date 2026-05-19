import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import MinhasReservas from './pages/MinhasReservas/MinhasReservas'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservas" element={<MinhasReservas />} />
      </Routes>
    </BrowserRouter>
  )
}
