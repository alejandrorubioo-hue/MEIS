import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Home() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [responses, setResponses] = useState({
    question1: '',
    question2: ''
  })
  const [showThankYou, setShowThankYou] = useState(false)
  const [savedResponses, setSavedResponses] = useState(null)

  // Cargar respuestas guardadas
  useEffect(() => {
    const saved = localStorage.getItem('eis_responses')
    if (saved) {
      setSavedResponses(JSON.parse(saved))
    }
  }, [])

  const modules = [
    {
      id: 1,
      title: "Módulo 1: Conceptos Fundamentales",
      subtitle: "Sexualidad y Derechos",
      icon: "📚"
    },
    {
      id: 2,
      title: "Módulo 2: Primera Infancia",
      subtitle: "0 a 5 años",
      icon: "👶"
    },
    {
      id: 3,
      title: "Módulo 3: Infancia",
      subtitle: "6 a 11 años",
      icon: "🧒"
    },
    {
      id: 4,
      title: "Módulo 4: Adolescencia",
      subtitle: "12 a 17 años",
      icon: "👦"
    },
    {
      id: 5,
      title: "Módulo 5: Prevención y Autocuidado",
      subtitle: "Herramientas de protección",
      icon: "🛡️"
    }
  ]

  const handleResponseChange = (question, value) => {
    setResponses({
      ...responses,
      [question]: value
    })
  }

  const handleSaveResponses = () => {
    if (responses.question1 || responses.question2) {
      localStorage.setItem('eis_responses', JSON.stringify(responses))
      setShowThankYou(true)
      setSavedResponses(responses)
      setTimeout(() => setShowThankYou(false), 3000)
    }
  }

  const statistics = [
    { number: "17", label: "Casos en 2023", sublabel: "Niñas 10-14 años" },
    { number: "21", label: "Casos en 2024", sublabel: "Niñas 10-14 años" },
    { number: "+23%", label: "Incremento", sublabel: "2023-2024" }
  ]

  return (
    <div className="home-container">
      {/* HEADER CON MENÚ */}
      <header className="professional-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo">EIS</span>
            <span className="logo-text">Manual de Educación Integral en Sexualidad</span>
          </div>

          <nav className="main-nav">
            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>Módulos</span>
              <svg className={`arrow ${menuOpen ? 'open' : ''}`} width="12" height="8">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>

            <div className={`dropdown-menu ${menuOpen ? 'active' : ''}`}>
              {modules.map(module => (
                <div
                  key={module.id}
                  className="dropdown-item"
                  onClick={() => navigate(`/modulo${module.id}`)}
                >
                  <span className="module-icon">{module.icon}</span>
                  <div className="module-info">
                    <span className="module-title">{module.title}</span>
                    <span className="module-subtitle">{module.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="nav-link" onClick={() => navigate('/recursos')}>
              Recursos
            </button>
            <button className="nav-link" onClick={() => navigate('/glosario')}>
              Glosario
            </button>
            <button className="nav-link" onClick={() => navigate('/contacto')}>
              Contacto
            </button>
          </nav>
        </div>
      </header>

      {/* SECCIÓN DE REFLEXIÓN INICIAL */}
      <section className="reflection-section">
        <div className="reflection-content">
          <h1 className="main-title">Reflexionemos Juntos</h1>
          <p className="intro-text">
            Antes de comenzar este viaje educativo, te invitamos a reflexionar sobre
            tu comprensión actual de la sexualidad y la educación integral.
          </p>

          <div className="questions-container">
            <div className="question-card">
              <label htmlFor="q1">
                <span className="question-number">1</span>
                ¿Qué es la sexualidad para ti?
              </label>
              <textarea
                id="q1"
                placeholder="No hay respuestas correctas o incorrectas. Es una invitación a pensar desde tu experiencia..."
                value={responses.question1}
                onChange={(e) => handleResponseChange('question1', e.target.value)}
                rows="4"
              />
            </div>

            <div className="question-card">
              <label htmlFor="q2">
                <span className="question-number">2</span>
                ¿Qué entiendes por Educación Integral en Sexualidad (EIS)?
              </label>
              <textarea
                id="q2"
                placeholder="Comparte tus ideas, dudas y conocimientos previos..."
                value={responses.question2}
                onChange={(e) => handleResponseChange('question2', e.target.value)}
                rows="4"
              />
            </div>

            <button
              className="save-button"
              onClick={handleSaveResponses}
              disabled={!responses.question1 && !responses.question2}
            >
              Guardar mis reflexiones
            </button>

            {showThankYou && (
              <div className="thank-you-message">
                ✅ Gracias por compartir tus reflexiones. ¡Comencemos!
              </div>
            )}

            {savedResponses && !showThankYou && (
              <div className="saved-indicator">
                💾 Tienes reflexiones guardadas
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTEXTO TERRITORIAL */}
      <section className="context-section">
        <div className="context-content">
          <h2>Contexto Territorial: Kennedy, Bogotá</h2>
          <p className="alert-text">
            ⚠️ El aumento del indicador de fecundidad en niñas de 10 a 14 años constituye
            una forma de <strong>violencia sexual</strong> y una grave vulneración de derechos.
          </p>

          <div className="statistics-grid">
            {statistics.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-sublabel">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* VIDEO EDUCATIVO */}
<section className="video-section">
  <div className="video-content">
    <h2>Diagnóstico Territorial</h2>
    <p>Análisis de la situación actual y la necesidad de intervención educativa</p>

    <div className="video-wrapper">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/rFGHDKk2VEA"
        title="Contexto Manual EIS"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</section>

      {/* DEFINICIÓN UNESCO/OMS */}
      <section className="definition-section">
        <div className="definition-content">
          <div className="definition-box">
            <h3>📘 Definición UNESCO y OMS</h3>
            <p>
              La UNESCO y la OMS definen la sexualidad como una dimensión central y multidimensional del ser
humano. La sexualidad abarca aspectos biológicos, psicológicos, sociales, afectivos y culturales, e
incluye la identidad de género, la orientación sexual, las relaciones íntimas, el placer y la
reproducción. 
            </p>
            <p className="definition-note">
              Es una experiencia compleja que se expresa en pensamientos, sentimientos,
              comportamientos y roles.
            </p>
          </div>
        </div>
      </section>

      {/* OBJETIVOS DEL MANUAL */}
      <section className="objectives-section">
        <div className="objectives-content">
          <h2>Objetivos del Manual</h2>
          <div className="objectives-grid">
            <div className="objective-card">
              <span className="objective-icon">🤝</span>
              <h4>Relaciones Respetuosas</h4>
              <p>Fomentar el desarrollo de relaciones sociales y sexuales basadas en el respeto mutuo</p>
            </div>
            <div className="objective-card">
              <span className="objective-icon">💡</span>
              <h4>Decisiones Informadas</h4>
              <p>Promover la toma de decisiones informadas y responsables</p>
            </div>
            <div className="objective-card">
              <span className="objective-icon">⚖️</span>
              <h4>Derechos Sexuales</h4>
              <p>Garantizar el ejercicio de los derechos sexuales y reproductivos</p>
            </div>
            <div className="objective-card">
              <span className="objective-icon">🛡️</span>
              <h4>Prevención</h4>
              <p>Prevenir embarazos no deseados y enfermedades de transmisión sexual</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Listo para comenzar?</h2>
          <p>Explora los módulos y construye herramientas para una educación sexual integral</p>
          <button
            className="cta-button"
            onClick={() => navigate('/modulo1')}
          >
            Comenzar con Módulo 1
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home