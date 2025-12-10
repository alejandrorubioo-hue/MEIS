// App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

// Páginas principales
import Home from './Home'
import Modulo1 from './Modulo1'
// import Modulo2 from './Modulo2'
// import Modulo3 from './Modulo3'
// import Modulo4 from './Modulo4'
// import Modulo5 from './Modulo5'
// import Recursos from './Recursos'
// import Glosario from './Glosario'
// import Contacto from './Contacto'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Ruta del Módulo 1 - ACTIVA */}
        <Route path="/modulo1" element={<Modulo1 />} />

        {/* Rutas de módulos pendientes - descomenta cuando crees los componentes */}
        {/* <Route path="/modulo2" element={<Modulo2 />} />
        <Route path="/modulo3" element={<Modulo3 />} />
        <Route path="/modulo4" element={<Modulo4 />} />
        <Route path="/modulo5" element={<Modulo5 />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/glosario" element={<Glosario />} />
        <Route path="/contacto" element={<Contacto />} /> */}

        {/* Redirige cualquier ruta no encontrada al Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App