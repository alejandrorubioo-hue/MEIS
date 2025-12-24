// Modulo2/index.jsx - Diversidad Familiar y Entornos Protectores
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

// Tipos de familia según el manual
const familyStructures = [
  {
    id: 'homoparental',
    name: 'Homoparental',
    description: 'Dos padres o dos madres con hijos',
    icon: '👨‍👨‍👧',
    color: '#FF6B6B'
  },
  {
    id: 'monoparental',
    name: 'Monoparental',
    description: 'Un padre o una madre con hijos',
    icon: '👩‍👧',
    color: '#4ECDC4'
  },
  {
    id: 'extensa',
    name: 'Extensa',
    description: 'Abuelos, tíos, primos viviendo juntos',
    icon: '👨‍👩‍👧‍👦',
    color: '#95E1D3'
  },
  {
    id: 'reconstituida',
    name: 'Reconstituida',
    description: 'Parejas con hijos de relaciones anteriores',
    icon: '👨‍👩‍👧‍👦',
    color: '#F3A683'
  },
  {
    id: 'adoptiva',
    name: 'Adoptiva',
    description: 'Padres con hijos adoptivos',
    icon: '👨‍👩‍👦',
    color: '#778BEB'
  },
  {
    id: 'sin-hijos',
    name: 'Sin hijos',
    description: 'Pareja sin hijos por elección',
    icon: '👫',
    color: '#CF6A87'
  }
]

function Modulo2() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState('intro')
  const [selectedFamilies, setSelectedFamilies] = useState([])
  const [safeSpaceElements, setSafeSpaceElements] = useState({
    lugar: '',
    personas: [],
    elementos: [],
    emociones: [],
    reglas: []
  })
  const [vennData, setVennData] = useState({
    cuidador1: { nombre: '', caracteristicas: [] },
    cuidador2: { nombre: '', caracteristicas: [] },
    yo: { caracteristicas: [] },
    intersecciones: {
      cuidador1_yo: [],
      cuidador2_yo: [],
      todos: []
    }
  })
  const [reflections, setReflections] = useState({
    protector: '',
    acuerdos: ''
  })

  // Elementos predefinidos para espacio seguro
  const safeSpaceOptions = {
    personas: ['Mamá', 'Papá', 'Abuelos', 'Hermanos', 'Tíos', 'Amigos', 'Maestros', 'Cuidadores'],
    elementos: ['Respeto', 'Comunicación', 'Confianza', 'Límites claros', 'Apoyo', 'Comprensión', 'Tiempo juntos', 'Escucha activa'],
    emociones: ['Amor', 'Seguridad', 'Tranquilidad', 'Alegría', 'Confianza', 'Protección', 'Calma', 'Felicidad'],
    reglas: ['No violencia', 'Respeto mutuo', 'Honestidad', 'Privacidad', 'Cuidado', 'Apoyo', 'Diálogo', 'Comprensión']
  }

  // Manejar selección de tipos de familia
  const toggleFamilySelection = (familyId) => {
    setSelectedFamilies(prev => {
      if (prev.includes(familyId)) {
        return prev.filter(id => id !== familyId)
      }
      return [...prev, familyId]
    })
  }

  // Agregar elemento al espacio seguro
  const toggleSafeSpaceElement = (category, element) => {
    setSafeSpaceElements(prev => ({
      ...prev,
      [category]: prev[category].includes(element)
        ? prev[category].filter(el => el !== element)
        : [...prev[category], element]
    }))
  }

  // Agregar característica al diagrama de Venn
  const addCharacteristic = (person, characteristic) => {
    if (!characteristic.trim()) return

    if (person === 'yo') {
      setVennData(prev => ({
        ...prev,
        yo: {
          ...prev.yo,
          caracteristicas: [...prev.yo.caracteristicas, characteristic]
        }
      }))
    } else {
      setVennData(prev => ({
        ...prev,
        [person]: {
          ...prev[person],
          caracteristicas: [...prev[person].caracteristicas, characteristic]
        }
      }))
    }
  }

  // Agregar característica compartida
  const addSharedCharacteristic = (intersection, characteristic) => {
    if (!characteristic.trim()) return

    setVennData(prev => ({
      ...prev,
      intersecciones: {
        ...prev.intersecciones,
        [intersection]: [...prev.intersecciones[intersection], characteristic]
      }
    }))
  }

  // Guardar progreso
  const saveProgress = () => {
    const data = {
      selectedFamilies,
      safeSpaceElements,
      vennData,
      reflections,
      date: new Date().toISOString()
    }
    localStorage.setItem('modulo2_diversidad_familiar', JSON.stringify(data))
    alert('Progreso guardado exitosamente')
  }

  // Calcular progreso
  const calculateProgress = () => {
    let progress = 0
    if (selectedFamilies.length > 0) progress += 25
    if (safeSpaceElements.lugar) progress += 25
    if (vennData.cuidador1.caracteristicas.length > 0) progress += 25
    if (reflections.protector) progress += 25
    return progress
  }

  // Renderizado según el paso actual
  if (currentStep === 'intro') {
    return (
      <div className="modulo2-container">
        <div className="intro-section">
          <div className="intro-card">
            <div className="intro-header">
              <span className="module-number">MÓDULO 2</span>
              <h1>La Familia y sus Formas Diversas</h1>
            </div>

            <div className="intro-content">
              <p className="intro-description">
                En este módulo exploraremos la diversidad de estructuras familiares,
                reconociendo que no existe un único modelo de familia. Lo importante
                son los vínculos de respeto, apoyo y protección que se construyen.
              </p>

              <div className="learning-objectives">
                <h3>🎯 Objetivos de Aprendizaje:</h3>
                <ul>
                  <li>Reconocer y respetar las diversas formas de familia</li>
                  <li>Identificar los elementos que hacen de la familia un espacio seguro</li>
                  <li>Reflexionar sobre los roles y vínculos afectivos</li>
                  <li>Fortalecer la identidad y autonomía personal</li>
                </ul>
              </div>

              <div className="module-structure">
                <h3>📚 Estructura del Módulo:</h3>
                <div className="structure-items">
                  <div className="structure-item">
                    <span className="item-number">1</span>
                    <span>Tipos de Familias</span>
                  </div>
                  <div className="structure-item">
                    <span className="item-number">2</span>
                    <span>Mi Espacio Seguro</span>
                  </div>
                  <div className="structure-item">
                    <span className="item-number">3</span>
                    <span>¿Qué me hace único/a?</span>
                  </div>
                  <div className="structure-item">
                    <span className="item-number">4</span>
                    <span>Reflexión Final</span>
                  </div>
                </div>
              </div>

              <div className="key-message">
                <span className="message-icon">💡</span>
                <p>
                  "Es fundamental dejar de lado creencias personales sobre la orientación
                  sexual, diversa o cultural de las familias para garantizar respeto,
                  inclusión y equidad."
                </p>
              </div>

              <button
                className="start-button"
                onClick={() => setCurrentStep('family-types')}
              >
                Comenzar Ejercicio
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'family-types') {
    return (
      <div className="modulo2-container">
        <header className="module-header">
          <button onClick={() => setCurrentStep('intro')} className="back-button">
            ← Volver
          </button>
          <div className="header-title">
            <h2>Tipos de Familias</h2>
            <p>Identifica y reconoce las diversas estructuras familiares</p>
          </div>
          <div className="progress-indicator">
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '25%'}}></div>
            </div>
            <span>Paso 1 de 4</span>
          </div>
        </header>

        <div className="family-types-content">
          <div className="instructions">
            <h3>📋 Instrucciones:</h3>
            <p>
              Observa los diferentes tipos de familia. Selecciona aquellos que
              conoces o has visto en tu comunidad. Recuerda: todas las formas
              de familia son válidas y merecen respeto.
            </p>
          </div>

          <div className="families-grid">
            {familyStructures.map(family => (
              <div
                key={family.id}
                className={`family-card ${selectedFamilies.includes(family.id) ? 'selected' : ''}`}
                onClick={() => toggleFamilySelection(family.id)}
                style={{borderColor: selectedFamilies.includes(family.id) ? family.color : '#e0e0e0'}}
              >
                <div className="family-icon" style={{backgroundColor: family.color + '20'}}>
                  <span>{family.icon}</span>
                </div>
                <h4>{family.name}</h4>
                <p>{family.description}</p>
                {selectedFamilies.includes(family.id) && (
                  <div className="check-mark">✓</div>
                )}
              </div>
            ))}
          </div>

          <div className="reflection-box">
            <h3>💭 Para reflexionar:</h3>
            <p>
              ¿Conoces otros tipos de familia que no están aquí?
              La diversidad familiar es mucho más amplia de lo que imaginamos.
            </p>
          </div>

          <div className="navigation">
            <button
              className="next-button"
              onClick={() => setCurrentStep('safe-space')}
              disabled={selectedFamilies.length === 0}
            >
              Continuar →
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'safe-space') {
    return (
      <div className="modulo2-container">
        <header className="module-header">
          <button onClick={() => setCurrentStep('family-types')} className="back-button">
            ← Volver
          </button>
          <div className="header-title">
            <h2>Mi Espacio Seguro</h2>
            <p>Identifica qué elementos hacen que tu entorno sea protector</p>
          </div>
          <div className="progress-indicator">
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '50%'}}></div>
            </div>
            <span>Paso 2 de 4</span>
          </div>
        </header>

        <div className="safe-space-content">
          <div className="instructions">
            <h3>🏡 Construye tu espacio seguro:</h3>
            <p>
              Un espacio seguro es donde te sientes cuidado/a y protegido/a.
              Selecciona los elementos que hacen que tu entorno sea seguro.
            </p>
          </div>

          <div className="safe-space-builder">
            <div className="space-input">
              <label>📍 Mi lugar seguro es:</label>
              <input
                type="text"
                placeholder="Ej: Mi casa, la casa de mis abuelos..."
                value={safeSpaceElements.lugar}
                onChange={(e) => setSafeSpaceElements(prev => ({...prev, lugar: e.target.value}))}
              />
            </div>

            <div className="elements-section">
              <h4>👥 Personas que me cuidan:</h4>
              <div className="elements-grid">
                {safeSpaceOptions.personas.map(persona => (
                  <button
                    key={persona}
                    className={`element-chip ${safeSpaceElements.personas.includes(persona) ? 'selected' : ''}`}
                    onClick={() => toggleSafeSpaceElement('personas', persona)}
                  >
                    {persona}
                  </button>
                ))}
              </div>
            </div>

            <div className="elements-section">
              <h4>🛡️ Elementos de protección:</h4>
              <div className="elements-grid">
                {safeSpaceOptions.elementos.map(elemento => (
                  <button
                    key={elemento}
                    className={`element-chip ${safeSpaceElements.elementos.includes(elemento) ? 'selected' : ''}`}
                    onClick={() => toggleSafeSpaceElement('elementos', elemento)}
                  >
                    {elemento}
                  </button>
                ))}
              </div>
            </div>

            <div className="elements-section">
              <h4>💝 Emociones que siento:</h4>
              <div className="elements-grid">
                {safeSpaceOptions.emociones.map(emocion => (
                  <button
                    key={emocion}
                    className={`element-chip ${safeSpaceElements.emociones.includes(emocion) ? 'selected' : ''}`}
                    onClick={() => toggleSafeSpaceElement('emociones', emocion)}
                  >
                    {emocion}
                  </button>
                ))}
              </div>
            </div>

            <div className="elements-section">
              <h4>📋 Reglas que nos protegen:</h4>
              <div className="elements-grid">
                {safeSpaceOptions.reglas.map(regla => (
                  <button
                    key={regla}
                    className={`element-chip ${safeSpaceElements.reglas.includes(regla) ? 'selected' : ''}`}
                    onClick={() => toggleSafeSpaceElement('reglas', regla)}
                  >
                    {regla}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="safe-space-summary">
            <h3>🌟 Mi espacio seguro tiene:</h3>
            <div className="summary-content">
              {safeSpaceElements.lugar && <p>📍 Lugar: {safeSpaceElements.lugar}</p>}
              {safeSpaceElements.personas.length > 0 && (
                <p>👥 {safeSpaceElements.personas.length} personas que me cuidan</p>
              )}
              {safeSpaceElements.elementos.length > 0 && (
                <p>🛡️ {safeSpaceElements.elementos.length} elementos protectores</p>
              )}
              {safeSpaceElements.emociones.length > 0 && (
                <p>💝 {safeSpaceElements.emociones.length} emociones positivas</p>
              )}
              {safeSpaceElements.reglas.length > 0 && (
                <p>📋 {safeSpaceElements.reglas.length} reglas de convivencia</p>
              )}
            </div>
          </div>

          <div className="navigation">
            <button
              className="next-button"
              onClick={() => setCurrentStep('venn-diagram')}
              disabled={!safeSpaceElements.lugar}
            >
              Continuar →
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'venn-diagram') {
    return (
      <div className="modulo2-container">
        <header className="module-header">
          <button onClick={() => setCurrentStep('safe-space')} className="back-button">
            ← Volver
          </button>
          <div className="header-title">
            <h2>¿Qué me hace único/a?</h2>
            <p>Descubre tu identidad a través de las relaciones familiares</p>
          </div>
          <div className="progress-indicator">
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '75%'}}></div>
            </div>
            <span>Paso 3 de 4</span>
          </div>
        </header>

        <div className="venn-content">
          <div className="instructions">
            <h3>🎯 Diagrama de identidad:</h3>
            <p>
              Este ejercicio te ayudará a visualizar cómo se fusionan los principales
              pilares de tu identidad y qué te hace único/a.
            </p>
          </div>

          <div className="venn-builder">
            <div className="venn-inputs">
              <div className="person-input">
                <h4>👤 Cuidador 1:</h4>
                <input
                  type="text"
                  placeholder="Nombre (Ej: Mamá, Papá, Abuelo...)"
                  value={vennData.cuidador1.nombre}
                  onChange={(e) => setVennData(prev => ({
                    ...prev,
                    cuidador1: {...prev.cuidador1, nombre: e.target.value}
                  }))}
                />
                <div className="characteristics-input">
                  <input
                    type="text"
                    placeholder="Agregar característica..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addCharacteristic('cuidador1', e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                  <div className="characteristics-list">
                    {vennData.cuidador1.caracteristicas.map((car, idx) => (
                      <span key={idx} className="characteristic-chip">{car}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="person-input">
                <h4>👤 Cuidador 2:</h4>
                <input
                  type="text"
                  placeholder="Nombre (Ej: Mamá, Papá, Abuelo...)"
                  value={vennData.cuidador2.nombre}
                  onChange={(e) => setVennData(prev => ({
                    ...prev,
                    cuidador2: {...prev.cuidador2, nombre: e.target.value}
                  }))}
                />
                <div className="characteristics-input">
                  <input
                    type="text"
                    placeholder="Agregar característica..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addCharacteristic('cuidador2', e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                  <div className="characteristics-list">
                    {vennData.cuidador2.caracteristicas.map((car, idx) => (
                      <span key={idx} className="characteristic-chip">{car}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="venn-visualization">
              <div className="venn-diagram">
                <div className="circle circle-1">
                  <span className="circle-label">{vennData.cuidador1.nombre || 'Cuidador 1'}</span>
                </div>
                <div className="circle circle-2">
                  <span className="circle-label">{vennData.cuidador2.nombre || 'Cuidador 2'}</span>
                </div>
                <div className="circle circle-3">
                  <span className="circle-label">YO</span>
                </div>
                <div className="intersection-center">
                  <span>Todos compartimos</span>
                </div>
              </div>
            </div>

            <div className="my-characteristics">
              <h4>⭐ Mis características únicas:</h4>
              <div className="characteristics-input">
                <input
                  type="text"
                  placeholder="Lo que me hace único/a..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addCharacteristic('yo', e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <div className="characteristics-list">
                  {vennData.yo.caracteristicas.map((car, idx) => (
                    <span key={idx} className="characteristic-chip unique">{car}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="shared-characteristics">
              <h4>🤝 Características compartidas:</h4>
              <div className="shared-input">
                <label>Lo que comparto con {vennData.cuidador1.nombre || 'Cuidador 1'}:</label>
                <input
                  type="text"
                  placeholder="Agregar..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSharedCharacteristic('cuidador1_yo', e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <div className="characteristics-list">
                  {vennData.intersecciones.cuidador1_yo.map((car, idx) => (
                    <span key={idx} className="characteristic-chip shared">{car}</span>
                  ))}
                </div>
              </div>

              <div className="shared-input">
                <label>Lo que comparto con {vennData.cuidador2.nombre || 'Cuidador 2'}:</label>
                <input
                  type="text"
                  placeholder="Agregar..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSharedCharacteristic('cuidador2_yo', e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <div className="characteristics-list">
                  {vennData.intersecciones.cuidador2_yo.map((car, idx) => (
                    <span key={idx} className="characteristic-chip shared">{car}</span>
                  ))}
                </div>
              </div>

              <div className="shared-input">
                <label>Lo que todos compartimos:</label>
                <input
                  type="text"
                  placeholder="Agregar..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSharedCharacteristic('todos', e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <div className="characteristics-list">
                  {vennData.intersecciones.todos.map((car, idx) => (
                    <span key={idx} className="characteristic-chip shared">{car}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="navigation">
            <button
              className="next-button"
              onClick={() => setCurrentStep('reflection')}
            >
              Continuar →
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'reflection') {
    return (
      <div className="modulo2-container">
        <header className="module-header">
          <button onClick={() => setCurrentStep('venn-diagram')} className="back-button">
            ← Volver
          </button>
          <div className="header-title">
            <h2>Reflexión Final</h2>
            <p>Consolida tus aprendizajes</p>
          </div>
          <div className="progress-indicator">
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '100%'}}></div>
            </div>
            <span>Paso 4 de 4</span>
          </div>
        </header>

        <div className="reflection-content">
          <div className="reflection-intro">
            <h3>🌟 Has completado el recorrido</h3>
            <p>
              Ahora reflexionemos sobre lo que has descubierto acerca de la
              diversidad familiar y tu espacio seguro.
            </p>
          </div>

          <div className="reflection-questions">
            <div className="reflection-question">
              <h4>💭 ¿Qué hace que tu entorno sea protector?</h4>
              <textarea
                placeholder="Reflexiona sobre los elementos que identificaste..."
                value={reflections.protector}
                onChange={(e) => setReflections(prev => ({...prev, protector: e.target.value}))}
                rows="4"
              />
            </div>

            <div className="reflection-question">
              <h4>🤔 ¿Qué pasa cuando esos acuerdos no se cumplen?</h4>
              <textarea
                placeholder="Piensa en la importancia de mantener los acuerdos familiares..."
                value={reflections.acuerdos}
                onChange={(e) => setReflections(prev => ({...prev, acuerdos: e.target.value}))}
                rows="4"
              />
            </div>
          </div>

          <div className="module-summary">
            <h3>📊 Tu resumen del módulo:</h3>

            <div className="summary-cards">
              <div className="summary-card">
                <div className="card-icon">🏠</div>
                <div className="card-content">
                  <h5>Tipos de familia identificados</h5>
                  <p>{selectedFamilies.length} estructuras familiares</p>
                </div>
              </div>

              <div className="summary-card">
                <div className="card-icon">🛡️</div>
                <div className="card-content">
                  <h5>Mi espacio seguro</h5>
                  <p>{safeSpaceElements.lugar || 'No definido'}</p>
                  <small>
                    {safeSpaceElements.personas.length +
                     safeSpaceElements.elementos.length +
                     safeSpaceElements.emociones.length +
                     safeSpaceElements.reglas.length} elementos protectores
                  </small>
                </div>
              </div>

              <div className="summary-card">
                <div className="card-icon">⭐</div>
                <div className="card-content">
                  <h5>Mi identidad única</h5>
                  <p>{vennData.yo.caracteristicas.length} características propias</p>
                  <small>
                    {vennData.intersecciones.cuidador1_yo.length +
                     vennData.intersecciones.cuidador2_yo.length +
                     vennData.intersecciones.todos.length} compartidas
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="key-learnings">
            <h3>🔑 Aprendizajes clave:</h3>
            <div className="learning-cards">
              <div className="learning-card">
                <span className="learning-icon">🌈</span>
                <p>
                  La familia no tiene una forma única. Lo fundamental son las
                  relaciones de respeto, apoyo y protección.
                </p>
              </div>
              <div className="learning-card">
                <span className="learning-icon">🏡</span>
                <p>
                  Un espacio seguro ofrece afecto, límites, cuidado y
                  acompañamiento para el desarrollo integral.
                </p>
              </div>
              <div className="learning-card">
                <span className="learning-icon">💝</span>
                <p>
                  Podemos compartir características con nuestros cuidadores,
                  pero también tenemos cualidades únicas.
                </p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="save-button"
              onClick={saveProgress}
            >
              💾 Guardar Mi Progreso
            </button>
            <button
              className="print-button"
              onClick={() => window.print()}
            >
              🖨️ Imprimir Resumen
            </button>
            <button
              className="continue-button"
              onClick={() => navigate('/modulo3')}
            >
              Continuar al Módulo 3 →
            </button>
          </div>

          <div className="completion-badge">
            <div className="badge-content">
              <span className="badge-icon">🏆</span>
              <h4>¡Felicitaciones!</h4>
              <p>Has completado el Módulo 2: Diversidad Familiar</p>
              <div className="progress-final">
                <span>Progreso Total: {calculateProgress()}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default Modulo2