import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showFields, setShowFields] = useState(true)
  const [showNotice, setShowNotice] = useState(false)
  const [fields, setFields] = useState(
    {
      noun1: "",
      noun2: "",
      adjective: "",
      color: "",
    }
  )

  const toggleState = () => {
    if (!showFields) {
      setFields(
        {
          noun1: "",
          noun2: "",
          adjective: "",
          color: "",
        }
      )
      setShowFields(curr => !curr)
      return
    }
    if (fields.noun1 !== "" && fields.noun2 !== "" && fields.adjective !== "" && fields.color !== "") {
      setShowFields(curr => !curr)
      setShowNotice(false)
      return
    }
    setShowNotice(true)
    return
  }

  return (
    <>
      <h1>Mad Libs</h1>
      {showFields ? (
        <div>
          <input type="text" placeholder="noun1" onChange={(e) => setFields({...fields, noun1: e.target.value})}/>
          <input type="text" placeholder="noun2" onChange={(e) => setFields({...fields, noun2: e.target.value})}/>
          <input type="text" placeholder="adjective" onChange={(e) => setFields({...fields, adjective: e.target.value})}/>
          <input type="text" placeholder="color" onChange={(e) => setFields({...fields, color: e.target.value})}/>
          <button onClick={() => toggleState()}>Generate!</button>
          {showNotice ? <p>Please fill out all fields</p> : null}
        </div>
      ) :
      (
        <div>
          <p>There once was a {fields.noun1} who loved a {fields.noun2}. The {fields.noun1} was {fields.adjective} and the {fields.noun2} was {fields.color}.</p>
          <button onClick={() => toggleState()}>Reset</button>
        </div>
      )}
    </>
  )
}

export default App
