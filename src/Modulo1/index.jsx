// Modulo1/index.jsx - Cartografía Corporal Interactiva
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Modulo1() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [selectedZone, setSelectedZone] = useState(null)
  const [emotions, setEmotions] = useState({})
  const [reflections, setReflections] = useState({
    fortalezas: '',
    vulnerabilidades: '',
    limites: '',
    placeres: '',
    miedos: ''
  })
  const [showResults, setShowResults] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedGender, setSelectedGender] = useState('neutral')
  const [savedData, setSavedData] = useState(null)
  const [showTooltip, setShowTooltip] = useState(true)

  // Colores emocionales con significados
  const emotionalColors = [
    { id: 'alegria', color: '#FFD93D', name: 'Alegría', description: 'Felicidad, gozo, satisfacción' },
    { id: 'amor', color: '#FF6B9D', name: 'Amor', description: 'Afecto, ternura, conexión' },
    { id: 'confianza', color: '#4ECDC4', name: 'Confianza', description: 'Seguridad, tranquilidad' },
    { id: 'miedo', color: '#95A5A6', name: 'Miedo', description: 'Temor, inseguridad, preocupación' },
    { id: 'poder', color: '#9B59B6', name: 'Poder', description: 'Fortaleza, autonomía, control' },
    { id: 'tristeza', color: '#3498DB', name: 'Tristeza', description: 'Melancolía, nostalgia' },
    { id: 'verguenza', color: '#E74C3C', name: 'Vergüenza', description: 'Pudor, incomodidad' },
    { id: 'neutral', color: '#BDC3C7', name: 'Neutral', description: 'Sin emoción específica' }
  ]

  // Zonas del cuerpo para la cartografía
  const bodyZones = [
    { id: 'cabeza', name: 'Cabeza', description: 'Pensamientos, ideas, sueños', icon: '🧠' },
    { id: 'ojos', name: 'Ojos', description: 'Perspectiva, observación, visión', icon: '👁️' },
    { id: 'boca', name: 'Boca', description: 'Comunicación, expresión, voz', icon: '👄' },
    { id: 'corazon', name: 'Corazón', description: 'Emociones, sentimientos, afectos', icon: '❤️' },
    { id: 'manos', name: 'Manos', description: 'Acciones, creación, contacto', icon: '🤲' },
    { id: 'estomago', name: 'Estómago', description: 'Intuición, sensaciones, nervios', icon: '🌟' },
    { id: 'pies', name: 'Pies', description: 'Camino, dirección, estabilidad', icon: '👣' },
    { id: 'espalda', name: 'Espalda', description: 'Cargas, responsabilidades, apoyo', icon: '💪' }
  ]

  // Pasos del proceso
  const steps = [
    { id: 0, title: 'Introducción', icon: '📖' },
    { id: 1, title: 'Selección de Silueta', icon: '👤' },
    { id: 2, title: 'Mapeo Emocional', icon: '🎨' },
    { id: 3, title: 'Reflexiones', icon: '💭' },
    { id: 4, title: 'Resultados', icon: '✨' }
  ]

  // Cargar datos guardados
  useEffect(() => {
    const saved = localStorage.getItem('modulo1_cartografia')
    if (saved) {
      setSavedData(JSON.parse(saved))
    }
    setTimeout(() => setShowTooltip(false), 5000)
  }, [])

  // Calcular progreso
  useEffect(() => {
    const totalFields = Object.keys(emotions).length + Object.values(reflections).filter(r => r).length
    const maxFields = bodyZones.length + Object.keys(reflections).length
    setProgress((totalFields / maxFields) * 100)
  }, [emotions, reflections])

  // Guardar cartografía
  const saveCartografia = () => {
    const data = {
      gender: selectedGender,
      emotions,
      reflections,
      date: new Date().toISOString()
    }
    localStorage.setItem('modulo1_cartografia', JSON.stringify(data))
    setShowResults(true)
  }

  // Asignar emoción a zona
  const assignEmotion = (zoneId, emotionId) => {
    setEmotions({
      ...emotions,
      [zoneId]: emotionId
    })
  }

  // Componente de Silueta Interactiva
  const InteractiveSilhouette = () => (
    <div className="silhouette-container">
      <div className="silhouette-wrapper">
        <svg viewBox="0 0 200 400" className="body-silhouette">
          {/* Silueta básica */}
          <path
            d="M100,40 C100,20 100,20 100,40 C120,40 130,50 130,70 L130,150 L150,120 L160,130 L140,170 L140,250 L160,350 L140,360 L110,260 L100,280 L90,260 L60,360 L40,350 L60,250 L60,170 L40,130 L50,120 L70,150 L70,70 C70,50 80,40 100,40 Z"
            fill="#f0f0f0"
            stroke="#333"
            strokeWidth="2"
          />

          {/* Zonas interactivas */}
          <circle
            cx="100" cy="40" r="25"
            className={`body-zone ${emotions.cabeza ? 'active' : ''}`}
            data-zone="cabeza"
            onClick={() => setSelectedZone('cabeza')}
            fill={emotions.cabeza ? emotionalColors.find(e => e.id === emotions.cabeza)?.color : 'transparent'}
            fillOpacity="0.6"
          />
          <circle
            cx="100" cy="100" r="20"
            className={`body-zone ${emotions.corazon ? 'active' : ''}`}
            data-zone="corazon"
            onClick={() => setSelectedZone('corazon')}
            fill={emotions.corazon ? emotionalColors.find(e => e.id === emotions.corazon)?.color : 'transparent'}
            fillOpacity="0.6"
          />
          <circle
            cx="100" cy="150" r="20"
            className={`body-zone ${emotions.estomago ? 'active' : ''}`}
            data-zone="estomago"
            onClick={() => setSelectedZone('estomago')}
            fill={emotions.estomago ? emotionalColors.find(e => e.id === emotions.estomago)?.color : 'transparent'}
            fillOpacity="0.6"
          />
          <circle
            cx="150" cy="140" r="15"
            className={`body-zone ${emotions.manos ? 'active' : ''}`}
            data-zone="manos"
            onClick={() => setSelectedZone('manos')}
            fill={emotions.manos ? emotionalColors.find(e => e.id === emotions.manos)?.color : 'transparent'}
            fillOpacity="0.6"
          />
          <circle
            cx="50" cy="140" r="15"
            className={`body-zone ${emotions.manos ? 'active' : ''}`}
            data-zone="manos"
            onClick={() => setSelectedZone('manos')}
            fill={emotions.manos ? emotionalColors.find(e => e.id === emotions.manos)?.color : 'transparent'}
            fillOpacity="0.6"
          />
        </svg>

        {/* Etiquetas de zonas */}
        <div className="zone-labels">
          {bodyZones.map(zone => (
            <button
              key={zone.id}
              className={`zone-label ${selectedZone === zone.id ? 'active' : ''} ${emotions[zone.id] ? 'filled' : ''}`}
              onClick={() => setSelectedZone(zone.id)}
            >
              <span className="zone-icon">{zone.icon}</span>
              <span className="zone-name">{zone.name}</span>
              {emotions[zone.id] && (
                <span className="zone-emotion" style={{
                  backgroundColor: emotionalColors.find(e => e.id === emotions[zone.id])?.color
                }}></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Panel de emociones */}
      {selectedZone && (
        <div className="emotion-panel">
          <h3>
            Asignar emoción a: {bodyZones.find(z => z.id === selectedZone)?.name}
          </h3>
          <p className="zone-description">
            {bodyZones.find(z => z.id === selectedZone)?.description}
          </p>
          <div className="emotion-grid">
            {emotionalColors.map(emotion => (
              <button
                key={emotion.id}
                className={`emotion-button ${emotions[selectedZone] === emotion.id ? 'selected' : ''}`}
                onClick={() => assignEmotion(selectedZone, emotion.id)}
                style={{ backgroundColor: emotion.color }}
              >
                <span className="emotion-name">{emotion.name}</span>
                <span className="emotion-description">{emotion.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  // Renderizado principal
  return (
    <div className="modulo1-container">
      {/* Header del módulo */}
      <header className="module-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate('/home')}>
            ← Volver
          </button>
          <div className="module-title-section">
            <span className="module-icon">🎨</span>
            <div>
              <h1>Módulo 1: Cartografía Corporal</h1>
              <p>Emocionalidad y autoconocimiento</p>
            </div>
          </div>
          <div className="progress-indicator">
            <span>{Math.round(progress)}%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      {/* Navegación por pasos */}
      <div className="steps-navigation">
        {steps.map(step => (
          <button
            key={step.id}
            className={`step-button ${activeStep === step.id ? 'active' : ''} ${activeStep > step.id ? 'completed' : ''}`}
            onClick={() => setActiveStep(step.id)}
          >
            <span className="step-icon">{step.icon}</span>
            <span className="step-title">{step.title}</span>
          </button>
        ))}
      </div>

      {/* Contenido del paso activo */}
      <div className="module-content">
        {/* Paso 0: Introducción */}
        {activeStep === 0 && (
          <div className="step-content introduction">
            <div className="intro-card">
              <h2>Bienvenid@ a tu Cartografía Corporal</h2>
              <p className="intro-text">
                Este ejercicio te ayudará a explorar la relación con tu cuerpo, identificar emociones
                y reflexionar sobre tu sexualidad de manera integral y respetuosa.
              </p>

              <div className="intro-features">
                <div className="feature">
                  <span className="feature-icon">🎨</span>
                  <h4>Mapeo Emocional</h4>
                  <p>Asocia colores y emociones a diferentes partes de tu cuerpo</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">💭</span>
                  <h4>Reflexión Guiada</h4>
                  <p>Preguntas que te ayudarán a profundizar en tu autoconocimiento</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🔒</span>
                  <h4>Espacio Seguro</h4>
                  <p>Tus respuestas son privadas y se guardan solo en tu dispositivo</p>
                </div>
              </div>

              {savedData && (
                <div className="saved-data-notice">
                  <span>💾 Tienes una cartografía guardada del {new Date(savedData.date).toLocaleDateString()}</span>
                  <button onClick={() => {
                    setEmotions(savedData.emotions)
                    setReflections(savedData.reflections)
                    setSelectedGender(savedData.gender)
                  }}>
                    Cargar
                  </button>
                </div>
              )}

              <button className="primary-button" onClick={() => setActiveStep(1)}>
                Comenzar →
              </button>
            </div>
          </div>
        )}

        {/* Paso 1: Selección de silueta */}
        {activeStep === 1 && (
          <div className="step-content gender-selection">
            <h2>Elige la silueta con la que te identifiques</h2>
            <p>Puedes elegir la representación que mejor te represente</p>

            <div className="gender-options">
              <button
                className={`gender-option ${selectedGender === 'femenino' ? 'selected' : ''}`}
                onClick={() => setSelectedGender('femenino')}
              >
                <span className="gender-icon">👩</span>
                <span>Silueta Femenina</span>
              </button>
              <button
                className={`gender-option ${selectedGender === 'masculino' ? 'selected' : ''}`}
                onClick={() => setSelectedGender('masculino')}
              >
                <span className="gender-icon">👨</span>
                <span>Silueta Masculina</span>
              </button>
              <button
                className={`gender-option ${selectedGender === 'neutral' ? 'selected' : ''}`}
                onClick={() => setSelectedGender('neutral')}
              >
                <span className="gender-icon">👤</span>
                <span>Silueta Neutral</span>
              </button>
            </div>

            <div className="navigation-buttons">
              <button className="secondary-button" onClick={() => setActiveStep(0)}>
                ← Anterior
              </button>
              <button className="primary-button" onClick={() => setActiveStep(2)}>
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Mapeo emocional */}
        {activeStep === 2 && (
          <div className="step-content mapping">
            {showTooltip && (
              <div className="tooltip-banner">
                💡 Haz clic en las zonas del cuerpo o en los botones laterales para asignar emociones
              </div>
            )}
            <InteractiveSilhouette />

            <div className="navigation-buttons">
              <button className="secondary-button" onClick={() => setActiveStep(1)}>
                ← Anterior
              </button>
              <button
                className="primary-button"
                onClick={() => setActiveStep(3)}
                disabled={Object.keys(emotions).length < 3}
              >
                Siguiente →
              </button>
            </div>

            {Object.keys(emotions).length < 3 && (
              <p className="hint-text">Asigna al menos 3 emociones para continuar</p>
            )}
          </div>
        )}

        {/* Paso 3: Reflexiones */}
        {activeStep === 3 && (
          <div className="step-content reflections">
            <h2>Reflexiones sobre tu cartografía</h2>
            <p>Tómate un momento para reflexionar sobre lo que has mapeado</p>

            <div className="reflection-cards">
              <div className="reflection-card">
                <label>
                  <span className="reflection-icon">💪</span>
                  ¿Qué fortalezas identificaste en tu cuerpo?
                </label>
                <textarea
                  placeholder="Describe las zonas donde sientes poder, confianza o alegría..."
                  value={reflections.fortalezas}
                  onChange={(e) => setReflections({...reflections, fortalezas: e.target.value})}
                  rows="3"
                />
              </div>

              <div className="reflection-card">
                <label>
                  <span className="reflection-icon">🛡️</span>
                  ¿Qué límites son importantes para ti?
                </label>
                <textarea
                  placeholder="¿Qué partes de tu cuerpo o emociones necesitan mayor cuidado y respeto?"
                  value={reflections.limites}
                  onChange={(e) => setReflections({...reflections, limites: e.target.value})}
                  rows="3"
                />
              </div>

              <div className="reflection-card">
                <label>
                  <span className="reflection-icon">❤️</span>
                  ¿Qué te produce bienestar y placer?
                </label>
                <textarea
                  placeholder="Identifica qué sensaciones o experiencias te generan satisfacción..."
                  value={reflections.placeres}
                  onChange={(e) => setReflections({...reflections, placeres: e.target.value})}
                  rows="3"
                />
              </div>

              <div className="reflection-card">
                <label>
                  <span className="reflection-icon">🌱</span>
                  ¿Qué áreas identificas como vulnerables?
                </label>
                <textarea
                  placeholder="¿Dónde sientes que necesitas mayor protección o comprensión?"
                  value={reflections.vulnerabilidades}
                  onChange={(e) => setReflections({...reflections, vulnerabilidades: e.target.value})}
                  rows="3"
                />
              </div>

              <div className="reflection-card">
                <label>
                  <span className="reflection-icon">🔮</span>
                  ¿Qué miedos o preocupaciones surgieron?
                </label>
                <textarea
                  placeholder="Es normal sentir temores. ¿Cuáles identificaste durante este ejercicio?"
                  value={reflections.miedos}
                  onChange={(e) => setReflections({...reflections, miedos: e.target.value})}
                  rows="3"
                />
              </div>
            </div>

            <div className="navigation-buttons">
              <button className="secondary-button" onClick={() => setActiveStep(2)}>
                ← Anterior
              </button>
              <button
                className="primary-button save-button"
                onClick={saveCartografia}
              >
                Guardar y Ver Resultados →
              </button>
            </div>
          </div>
        )}

        {/* Paso 4: Resultados */}
        {activeStep === 4 || showResults && (
          <div className="step-content results">
            <div className="results-card">
              <h2>✨ Tu Cartografía Personal</h2>
              <p>Has completado exitosamente tu mapeo corporal-emocional</p>

              <div className="results-summary">
                <div className="summary-section">
                  <h3>Emociones Mapeadas</h3>
                  <div className="emotion-summary">
                    {Object.entries(emotions).map(([zone, emotion]) => {
                      const emotionData = emotionalColors.find(e => e.id === emotion)
                      const zoneData = bodyZones.find(z => z.id === zone)
                      return (
                        <div key={zone} className="emotion-item">
                          <span className="zone-name">{zoneData?.icon} {zoneData?.name}:</span>
                          <span
                            className="emotion-tag"
                            style={{ backgroundColor: emotionData?.color }}
                          >
                            {emotionData?.name}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="summary-section">
                  <h3>Reflexiones Clave</h3>
                  <div className="reflections-summary">
                    {Object.entries(reflections).filter(([_, value]) => value).map(([key, value]) => (
                      <div key={key} className="reflection-item">
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                        <p>{value.substring(0, 100)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="results-actions">
                <button className="secondary-button" onClick={() => window.print()}>
                  📄 Imprimir
                </button>
                <button
                  className="primary-button"
                  onClick={() => navigate('/modulo2')}
                >
                  Continuar al Módulo 2 →
                </button>
              </div>

              <div className="privacy-note">
                <span>🔒</span>
                <p>Tu cartografía se ha guardado de forma privada en tu dispositivo.
                   Puedes consultarla cuando quieras desde este módulo.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer informativo */}
      <footer className="module-footer">
        <div className="footer-content">
          <p>
            <strong>Recuerda:</strong> Este es un espacio seguro para tu autoexploración.
            No hay respuestas correctas o incorrectas, solo tu experiencia personal.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Modulo1
