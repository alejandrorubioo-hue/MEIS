  // Modulo1/index.jsx - Cartografía Corporal Rediseñada con 3 columnas
  import { useState, useEffect, useRef } from 'react'
  import { useNavigate } from 'react-router-dom'
  import './style.css'

  // Importar las imágenes de siluetas
  import siluetaFemenina from './images/silueta-femenina.png'
  import siluetaMasculina from './images/silueta-masculina.png'
  

  function Modulo1() {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState('intro')
    const [selectedGender, setSelectedGender] = useState('femenino')
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [responses, setResponses] = useState({})
    const [bodySelections, setBodySelections] = useState({})
    const [showResults, setShowResults] = useState(false)

    // Referencias para evitar pérdida de foco
    const textAreaRefs = useRef({})

    // Mapa de siluetas
    const silhouettes = {
      femenino: siluetaFemenina,
      masculino: siluetaMasculina
     
    }

    // Matriz de preguntas según el documento
    const questions = [
      // SEXUALIDAD - Morado
      {
        id: 'sex1',
        component: 'sexualidad',
        color: '#9B59B6',
        text: '¿Te hablaron de sexualidad? ¿quién o a qué edad?',
        instruction: 'Ubica esta respuesta alrededor de la cabeza',
        type: 'text',
        bodyPart: 'cabeza'
      },
      {
        id: 'sex2',
        component: 'sexualidad',
        color: '#9B59B6',
        text: '¿A qué edad fue tu menarquía? / ¿a qué edad escuchaste sobre la menstruación?',
        instruction: 'Ubica esta respuesta en el bajo vientre',
        type: 'text',
        bodyPart: 'vientre'
      },
      {
        id: 'sex3',
        component: 'sexualidad',
        color: '#9B59B6',
        text: '¿Qué historia te contaron frente a la gestación y la reproducción?',
        instruction: 'Resume la historia frente al estómago',
        type: 'text',
        bodyPart: 'estomago'
      },
      // IDENTIDAD - Amarillo
      {
        id: 'ident1',
        component: 'identidad',
        color: '#F39C12',
        text: '¿Cuál es la parte de tu cuerpo que más te gusta y cuál es la que menos?',
        instruction: 'Señala con ❤️ lo que más te gusta y con ❌ lo que menos',
        type: 'body-double',
        bodyPart: null
      },
      {
        id: 'ident2',
        component: 'identidad',
        color: '#F39C12',
        text: '¿Cuál es la parte de tu cuerpo que menos conoces o con la que menos te relacionas?',
        instruction: 'Señala con un signo de interrogación',
        type: 'body-single',
        marker: '❓',
        bodyPart: null
      },
      // GÉNERO - Naranja
      {
        id: 'gen1',
        component: 'genero',
        color: '#E67E22',
        text: '¿Cómo te vestías y peinabas cuando eras adolescente? (12-16 años)',
        instruction: 'Dibuja o describe alrededor de la figura',
        type: 'text',
        bodyPart: 'general'
      },
      {
        id: 'gen2',
        component: 'genero',
        color: '#E67E22',
        text: 'En tu infancia ¿qué cosas eran de niñas y qué cosas eran de niños?',
        instruction: 'Escribe a los lados de la silueta',
        type: 'text-split',
        bodyPart: 'lados'
      },
      // PLACER - Verde
      {
        id: 'plac1',
        component: 'placer',
        color: '#27AE60',
        text: '¿Qué parte de tu cuerpo usas para realizar tu actividad favorita?',
        instruction: 'Señálala con una estrella',
        type: 'body-single',
        marker: '⭐',
        bodyPart: null
      },
      {
        id: 'plac2',
        component: 'placer',
        color: '#27AE60',
        text: '¿En qué partes de tu cuerpo sientes placer?',
        instruction: 'Señala con asteriscos',
        type: 'body-multiple',
        marker: '✨',
        bodyPart: null
      },
      {
        id: 'plac3',
        component: 'placer',
        color: '#27AE60',
        text: '¿Qué parte de tu cuerpo consideras es la más erótica y cuál la más erógena?',
        instruction: 'Marca erótica con 🔥 y erógena con 💫',
        type: 'body-double-custom',
        markers: { erotica: '🔥', erogena: '💫' },
        bodyPart: null
      },
      {
        id: 'plac4',
        component: 'placer',
        color: '#27AE60',
        text: '¿A qué edad sentiste atracción erótica afectiva por otra persona?',
        instruction: 'Ubica en el corazón la respuesta',
        type: 'text',
        bodyPart: 'corazon'
      },
      {
        id: 'plac5',
        component: 'placer',
        color: '#27AE60',
        text: '¿Qué sientes y en dónde, cuando te enamoras?',
        instruction: 'Señala con una mariposa',
        type: 'body-text',
        marker: '🦋',
        bodyPart: null
      },
      // LÍMITES - Azul
      {
        id: 'lim1',
        component: 'limites',
        color: '#3498DB',
        text: 'En tu infancia, ¿cómo te enseñaron que era la forma correcta de un saludo?',
        instruction: 'Escribe en la parte inferior y señala si hay anécdota',
        type: 'text',
        bodyPart: 'inferior'
      }
    ]

    // Zonas clickeables del cuerpo
    const bodyZones = [
      { id: 'cabeza', name: 'Cabeza', x: '45%', y: '8%', width: '10%', height: '10%' },
      { id: 'ojos', name: 'Ojos', x: '45%', y: '10%', width: '10%', height: '3%' },
      { id: 'boca', name: 'Boca', x: '47%', y: '13%', width: '6%', height: '2%' },
      { id: 'cuello', name: 'Cuello', x: '47%', y: '15%', width: '6%', height: '4%' },
      { id: 'hombros', name: 'Hombros', x: '35%', y: '19%', width: '30%', height: '5%' },
      { id: 'brazos', name: 'Brazos', x: '25%', y: '24%', width: '50%', height: '15%' },
      { id: 'manos', name: 'Manos', x: '20%', y: '38%', width: '60%', height: '6%' },
      { id: 'pecho', name: 'Pecho', x: '40%', y: '24%', width: '20%', height: '8%' },
      { id: 'corazon', name: 'Corazón', x: '43%', y: '26%', width: '7%', height: '6%' },
      { id: 'estomago', name: 'Estómago', x: '42%', y: '32%', width: '16%', height: '8%' },
      { id: 'vientre', name: 'Vientre', x: '42%', y: '40%', width: '16%', height: '8%' },
      { id: 'caderas', name: 'Caderas', x: '37%', y: '45%', width: '26%', height: '8%' },
      { id: 'genitales', name: 'Zona íntima', x: '45%', y: '48%', width: '10%', height: '6%' },
      { id: 'muslos', name: 'Muslos', x: '38%', y: '54%', width: '24%', height: '15%' },
      { id: 'rodillas', name: 'Rodillas', x: '40%', y: '68%', width: '20%', height: '5%' },
      { id: 'piernas', name: 'Piernas', x: '38%', y: '73%', width: '24%', height: '15%' },
      { id: 'pies', name: 'Pies', x: '37%', y: '88%', width: '26%', height: '8%' }
    ]

    // Obtener pregunta actual
    const currentQuestion = questions[currentQuestionIndex]

    // Manejar cambio de texto sin perder foco
    const handleTextChange = (value, questionId) => {
      setResponses(prev => ({
        ...prev,
        [questionId]: value
      }))
    }

    
   /// Manejar selección de parte del cuerpo
const handleBodyPartClick = (zoneId) => {
  if (!currentQuestion) return

  if (currentQuestion.type === 'body-single') {
    setBodySelections(prev => ({
      ...prev,
      [currentQuestion.id]: { zone: zoneId, marker: currentQuestion.marker }
    }))

  } else if (currentQuestion.type === 'body-double') {
    setBodySelections(prev => {
      const current = prev[currentQuestion.id] || {}
      if (!current.gusto) {
        return {
          ...prev,
          [currentQuestion.id]: { ...current, gusto: zoneId }
        }
      } else if (!current.noGusto && zoneId !== current.gusto) {
        return {
          ...prev,
          [currentQuestion.id]: { ...current, noGusto: zoneId }
        }
      }
      return prev
    })

  } else if (currentQuestion.type === 'body-double-custom') {
    // CASO PARA ERÓTICA/ERÓGENA
    setBodySelections(prev => {
      const current = prev[currentQuestion.id] || {}
      if (!current.erotica) {
        return {
          ...prev,
          [currentQuestion.id]: { ...current, erotica: zoneId }
        }
      } else if (!current.erogena && zoneId !== current.erotica) {
        return {
          ...prev,
          [currentQuestion.id]: { ...current, erogena: zoneId }
        }
      }
      return prev
    })

  } else if (currentQuestion.type === 'body-multiple') {
    setBodySelections(prev => {
      const current = prev[currentQuestion.id] || []
      if (current.includes(zoneId)) {
        return {
          ...prev,
          [currentQuestion.id]: current.filter(id => id !== zoneId)
        }
      }
      return {
        ...prev,
        [currentQuestion.id]: [...current, zoneId]
      }
    })

  } else if (currentQuestion.type === 'body-text') {
    // CASO PARA PREGUNTAS CON TEXTO Y MARCADOR
    setBodySelections(prev => ({
      ...prev,
      [currentQuestion.id]: { zone: zoneId, marker: currentQuestion.marker }
    }))
  }
}

    // Navegación
    const goToNextQuestion = () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setShowResults(true)
        setCurrentStep('results')
      }
    }

    const goToPreviousQuestion = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
      }
    }

    // Calcular progreso
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    // Guardar cartografía
    const saveCartography = () => {
      const data = {
        gender: selectedGender,
        responses,
        bodySelections,
        date: new Date().toISOString()
      }
      localStorage.setItem('cartografia_corporal', JSON.stringify(data))
      alert('Cartografía guardada exitosamente')
    }

    // Renderizar según el paso actual
    if (currentStep === 'intro') {
      return (
        <div className="modulo-container">
          <div className="intro-screen">
            <div className="intro-card">
              <h1>🎨 Cartografía Corporal</h1>
              <h2>Módulo de Autoconocimiento y Sexualidad</h2>
              <p>Este ejercicio te guiará a través de una exploración personal sobre tu cuerpo,
                tu historia y tu sexualidad de manera integral y respetuosa.</p>

              <div className="components-preview">
                <div className="component-item" style={{backgroundColor: '#9B59B6'}}>
                  <span>Sexualidad</span>
                  <small>Educación y conceptos aprendidos</small>
                </div>
                <div className="component-item" style={{backgroundColor: '#F39C12'}}>
                  <span>Identidad</span>
                  <small>Relación con tu cuerpo</small>
                </div>
                <div className="component-item" style={{backgroundColor: '#E67E22'}}>
                  <span>Género</span>
                  <small>Expresión y orientación</small>
                </div>
                <div className="component-item" style={{backgroundColor: '#27AE60'}}>
                  <span>Placer</span>
                  <small>Sensaciones y afectos</small>
                </div>
                <div className="component-item" style={{backgroundColor: '#3498DB'}}>
                  <span>Límites</span>
                  <small>Respeto y consentimiento</small>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={() => setCurrentStep('gender')}
              >
                Comenzar Ejercicio →
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (currentStep === 'gender') {
      return (
        <div className="modulo-container">
          <div className="gender-selection">
            <h2>Selecciona la silueta con la que te identificas</h2>
            <p>Esta elección es personal y puedes cambiarla si lo deseas</p>

            <div className="gender-options">
              {Object.keys(silhouettes).map(gender => (
                <div
                  key={gender}
                  className={`gender-card ${selectedGender === gender ? 'selected' : ''}`}
                  onClick={() => setSelectedGender(gender)}
                >
                  <img src={silhouettes[gender]} alt={gender} />
                  <span>{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
                </div>
              ))}
            </div>

            <button
              className="btn-primary"
              onClick={() => setCurrentStep('questions')}
            >
              Continuar →
            </button>
          </div>
        </div>
      )
    }

    if (currentStep === 'questions') {
      return (
        <div className="modulo-container">
          <header className="modulo-header">
            <button onClick={() => navigate('/home')} className="btn-back">
              ← Volver
            </button>
            <h1>Módulo 1: Cartografía Corporal</h1>
            <span className="question-counter">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </span>
          </header>

          {/* Barra de progreso con componentes */}
          <div className="progress-bar-container">
            {['sexualidad', 'identidad', 'genero', 'placer', 'limites'].map(comp => (
              <div
                key={comp}
                className="progress-segment"
                style={{
                  backgroundColor: questions.find(q => q.component === comp)?.color,
                  width: '20%',
                  opacity: questions.filter(q => q.component === comp &&
                    questions.indexOf(q) <= currentQuestionIndex).length > 0 ? 1 : 0.3
                }}
              />
            ))}
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="main-content">
            {/* Panel izquierdo - Pregunta actual */}
            <div className="left-panel">
              <div
                className="question-card"
                style={{ borderColor: currentQuestion.color }}
              >
                <div
                  className="question-header"
                  style={{ backgroundColor: currentQuestion.color }}
                >
                  <span className="component-label">
                    {currentQuestion.component.toUpperCase()}
                  </span>
                </div>

                <h3>{currentQuestion.text}</h3>
                <p className="instruction">📍 {currentQuestion.instruction}</p>

                {/* Input según tipo de pregunta */}
                {currentQuestion.type === 'text' && (
                  <textarea
                    ref={el => textAreaRefs.current[currentQuestion.id] = el}
                    value={responses[currentQuestion.id] || ''}
                    onChange={(e) => handleTextChange(e.target.value, currentQuestion.id)}
                    placeholder="Escribe tu respuesta aquí..."
                    rows="4"
                    className="response-textarea"
                  />
                )}
                {/* Input para preguntas body-text (cuerpo + texto) */}
{currentQuestion.type === 'body-text' && (
  <div className="body-text-input">
    <textarea
      ref={el => textAreaRefs.current[currentQuestion.id] = el}
      value={responses[currentQuestion.id] || ''}
      onChange={(e) => handleTextChange(e.target.value, currentQuestion.id)}
      placeholder="Describe qué sientes cuando te enamoras..."
      rows="3"
      className="response-textarea"
    />
    <div className="selection-info">
      <p>{currentQuestion.marker} Selecciona en qué parte del cuerpo lo sientes</p>
      {bodySelections[currentQuestion.id] && (
        <div className="selections-made">
          {Array.isArray(bodySelections[currentQuestion.id]) ?
            bodySelections[currentQuestion.id].map(zone => (
              <span key={zone} className="selection-tag">
                {currentQuestion.marker} {bodyZones.find(z => z.id === zone)?.name}
              </span>
            ))
            :
            <span className="selection-tag">
              {currentQuestion.marker} {bodyZones.find(z => z.id === bodySelections[currentQuestion.id].zone)?.name}
            </span>
          }
        </div>
      )}
    </div>
  </div>
)}
                {/* Input para preguntas de tipo split (niñas/niños) */}
{currentQuestion.type === 'text-split' && (
  <div className="split-inputs">
    <div className="split-input-group">
      <label>👧 Cosas de niñas:</label>
      <textarea
        ref={el => textAreaRefs.current[`${currentQuestion.id}_girls`] = el}
        value={responses[`${currentQuestion.id}_girls`] || ''}
        onChange={(e) => handleTextChange(e.target.value, `${currentQuestion.id}_girls`)}
        placeholder="Escribe qué consideraban de niñas..."
        rows="3"
        className="response-textarea"
      />
    </div>
    <div className="split-input-group">
      <label>👦 Cosas de niños:</label>
      <textarea
        ref={el => textAreaRefs.current[`${currentQuestion.id}_boys`] = el}
        value={responses[`${currentQuestion.id}_boys`] || ''}
        onChange={(e) => handleTextChange(e.target.value, `${currentQuestion.id}_boys`)}
        placeholder="Escribe qué consideraban de niños..."
        rows="3"
        className="response-textarea"
      />
    </div>
  </div>
)}

                {currentQuestion.type === 'body-double-custom' && (
  <div className="selection-info">
    <p>Selecciona las partes del cuerpo:</p>
    <div className="selections-made">
      {bodySelections[currentQuestion.id]?.erotica && (
        <span className="selection-tag orange">
          🔥 Más erótica: {bodyZones.find(z => z.id === bodySelections[currentQuestion.id].erotica)?.name}
        </span>
      )}
      {bodySelections[currentQuestion.id]?.erogena && (
        <span className="selection-tag purple">
          💫 Más erógena: {bodyZones.find(z => z.id === bodySelections[currentQuestion.id].erogena)?.name}
        </span>
      )}
    </div>
    <small className="help-text">
      🔥 Primero selecciona la parte más erótica<br/>
      💫 Luego selecciona la parte más erógena
    </small>
  </div>
)}
                {(currentQuestion.type === 'body-single' || currentQuestion.type === 'body-multiple') && (
                  <div className="selection-info">
                    <p>{currentQuestion.marker} Haz clic en la silueta para marcar</p>
                    {bodySelections[currentQuestion.id] && (
                      <div className="selections-made">
                        {Array.isArray(bodySelections[currentQuestion.id]) ?
                          bodySelections[currentQuestion.id].map(zone => (
                            <span key={zone} className="selection-tag">
                              {currentQuestion.marker} {bodyZones.find(z => z.id === zone)?.name}
                            </span>
                          ))
                          :
                          <span className="selection-tag">
                            {currentQuestion.marker} {bodyZones.find(z => z.id === bodySelections[currentQuestion.id].zone)?.name}
                          </span>
                        }
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="navigation-buttons">
                <button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="btn-secondary"
                >
                  ← Anterior
                </button>
                <button
                  onClick={goToNextQuestion}
                  className="btn-primary"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente →'}
                </button>
              </div>
            </div>

            {/* Panel central - Silueta interactiva */}
            <div className="center-panel">
              <div className="silhouette-container">
                <img
                  src={silhouettes[selectedGender]}
                  alt="Silueta corporal"
                  className="body-silhouette"
                />

                {/* Zonas clickeables superpuestas */}
                {bodyZones.map(zone => (
                  <div
                    key={zone.id}
                    className={`body-zone ${
                      bodySelections[currentQuestion?.id]?.gusto === zone.id ? 'selected-green' :
                      bodySelections[currentQuestion?.id]?.noGusto === zone.id ? 'selected-red' :
                      bodySelections[currentQuestion?.id]?.zone === zone.id ? 'selected' :
                      Array.isArray(bodySelections[currentQuestion?.id]) &&
                      bodySelections[currentQuestion?.id].includes(zone.id) ? 'selected' : ''
                    }`}
                    style={{
                      left: zone.x,
                      top: zone.y,
                      width: zone.width,
                      height: zone.height
                    }}
                    onClick={() => handleBodyPartClick(zone.id)}
                    title={zone.name}
                  >
                    {bodySelections[currentQuestion?.id]?.gusto === zone.id && '❤️'}
                    {bodySelections[currentQuestion?.id]?.noGusto === zone.id && '❌'}
                    {bodySelections[currentQuestion?.id]?.erotica === zone.id && '🔥'}
{bodySelections[currentQuestion?.id]?.erogena === zone.id && '💫'}
                    {bodySelections[currentQuestion?.id]?.zone === zone.id && currentQuestion?.marker}
                    {Array.isArray(bodySelections[currentQuestion?.id]) &&
                    bodySelections[currentQuestion?.id].includes(zone.id) && currentQuestion?.marker}
                  </div>
                ))}
              </div>

              {/* Lista de zonas para selección */}
              {(currentQuestion?.type?.includes('body')) && (
                <div className="zones-list">
                  <p>Selecciona las zonas:</p>
                  <div className="zones-grid">
                    {bodyZones.map(zone => (
                      <button
                        key={zone.id}
                        className={`zone-btn ${
                          bodySelections[currentQuestion.id]?.gusto === zone.id ? 'selected-green' :
                          bodySelections[currentQuestion.id]?.noGusto === zone.id ? 'selected-red' :
                          bodySelections[currentQuestion.id]?.zone === zone.id ? 'selected' :
                          Array.isArray(bodySelections[currentQuestion.id]) &&
                          bodySelections[currentQuestion.id].includes(zone.id) ? 'selected' : ''
                        }`}
                        onClick={() => handleBodyPartClick(zone.id)}
                      >
                        {zone.name}
                        {bodySelections[currentQuestion.id]?.gusto === zone.id && ' ❤️'}
                        {bodySelections[currentQuestion.id]?.noGusto === zone.id && ' ❌'}
                        {bodySelections[currentQuestion.id]?.zone === zone.id && ` ${currentQuestion.marker}`}
                        {Array.isArray(bodySelections[currentQuestion.id]) &&
                        bodySelections[currentQuestion.id].includes(zone.id) && ` ${currentQuestion.marker}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Panel derecho - Respuestas registradas */}
            <div className="right-panel">
              <h3>📝 Respuestas registradas</h3>
              <div className="responses-list">
                {questions.slice(0, currentQuestionIndex + 1).map((q, idx) => (
                  <div
                    key={q.id}
                    className="response-item"
                    style={{ borderLeft: `3px solid ${q.color}` }}
                  >
                    <span className="response-number">#{idx + 1}</span>
                    <small>{q.text.substring(0, 50)}...</small>
                    {responses[q.id] && (
                      <p className="response-preview">
                        ✓ Respondida
                      </p>
                    )}
                    {bodySelections[q.id] && (
                      <p className="response-preview">
                        ✓ Marcada en silueta
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (currentStep === 'results') {
  return (
    <div className="modulo-container">
      <div className="results-screen">
        <div className="results-header">
          <h1>🎉 Tu Cartografía Personal Completada</h1>
          <p>Has explorado todas las dimensiones de tu corporalidad y sexualidad</p>
        </div>

        <div className="results-summary">
          {['sexualidad', 'identidad', 'genero', 'placer', 'limites'].map(comp => {
            const compQuestions = questions.filter(q => q.component === comp)

            return (
              <div
                key={comp}
                className="component-summary"
                style={{ borderColor: compQuestions[0]?.color }}
              >
                <div
                  className="component-header"
                  style={{ backgroundColor: compQuestions[0]?.color }}
                >
                  <h3>{comp.toUpperCase()}</h3>
                </div>
                <div className="component-body">
                  {compQuestions.map(q => (
                    <div key={q.id} className="summary-item">
                      <p className="question-text">{q.text}</p>

                      {/* Respuestas de texto normal */}
                      {responses[q.id] && (
  <p className="response-text">
    💭 {responses[q.id]}
  </p>
)}

                      {/* Respuestas split (niñas/niños) */}
                      {q.type === 'text-split' && (
                        <>
                          {responses[`${q.id}_girls`] && (
  <p className="response-text">
    👧 Niñas: {responses[`${q.id}_girls`]}
  </p>
)}
                          {responses[`${q.id}_boys`] && (
                            <p className="response-text">
                              👦 Niños: {responses[`${q.id}_boys`]}
                            </p>
                          )}
                        </>
                      )}

                      {/* Selección simple de cuerpo */}
                      {q.type === 'body-single' && bodySelections[q.id] && (
                        <p className="response-text">
                          ✓ {q.marker} Marcado: {bodyZones.find(z => z.id === bodySelections[q.id].zone)?.name}
                        </p>
                      )}

                      {/* Selección doble (gusto/no gusto) */}
                      {q.type === 'body-double' && bodySelections[q.id] && (
                        <>
                          {bodySelections[q.id].gusto && (
                            <p className="response-text">
                              ❤️ Lo que más gusta: {bodyZones.find(z => z.id === bodySelections[q.id].gusto)?.name}
                            </p>
                          )}
                          {bodySelections[q.id].noGusto && (
                            <p className="response-text">
                              ❌ Lo que menos gusta: {bodyZones.find(z => z.id === bodySelections[q.id].noGusto)?.name}
                            </p>
                          )}
                        </>
                      )}

                      {/* Selección múltiple */}
                      {q.type === 'body-multiple' && bodySelections[q.id] && (
                        <p className="response-text">
                          ✓ {q.marker} Zonas marcadas: {
                            bodySelections[q.id].map(zoneId =>
                              bodyZones.find(z => z.id === zoneId)?.name
                            ).filter(Boolean).join(', ')
                          }
                        </p>
                      )}

                      {/* Selección erótica/erógena */}
                      {q.type === 'body-double-custom' && bodySelections[q.id] && (
                        <>
                          {bodySelections[q.id].erotica && (
                            <p className="response-text">
                              🔥 Más erótica: {bodyZones.find(z => z.id === bodySelections[q.id].erotica)?.name}
                            </p>
                          )}
                          {bodySelections[q.id].erogena && (
                            <p className="response-text">
                              💫 Más erógena: {bodyZones.find(z => z.id === bodySelections[q.id].erogena)?.name}
                            </p>
                          )}
                        </>
                      )}

                      {/* Cuerpo con texto */}
{q.type === 'body-text' && (
  <>
    {bodySelections[q.id] && (
      <p className="response-text">
        ✓ {q.marker} Zona: {bodyZones.find(z => z.id === bodySelections[q.id].zone)?.name}
      </p>
    )}
    {responses[q.id] && (
  <p className="response-text">
    ✓ Respondida: {responses[q.id]}
  </p>
)}
  </>
)}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="results-actions">
          <button onClick={saveCartography} className="btn-primary">
            💾 Guardar Cartografía
          </button>
          <button onClick={() => window.print()} className="btn-secondary">
            🖨️ Imprimir
          </button>
          <button onClick={() => navigate('/modulo2')} className="btn-primary">
            Continuar al Módulo 2 →
          </button>
        </div>
      </div>
    </div>
  )
}


    return null
  }

  export default Modulo1