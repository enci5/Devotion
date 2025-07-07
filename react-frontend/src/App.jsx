import { useState, useEffect } from 'react'
import noteService from './services/note'


const Entry = ({ heading, body }) => {

  if (heading || body) {
    return (
      <>
        <h2>
          {heading}
        </h2>
        <p>
          {body}
        </p>
      </>
    )
  }

  return (
    <>
      <p> Awaiting input...</p>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [heading, setHeading] = useState("")
  const [body, setBody] = useState("")
  const [submittedHeading, setSubmittedHeading] = useState("")
  const [submittedBody, setSubmittedBody] = useState("")
  const [notes, setNotes] = useState([])

  console.log("Heading --> ", heading)
  console.log("Body-> ", body)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedHeading(heading)
    setSubmittedBody(body)
  }

  const Note = ({ notes }) => {

    if (notes) {
      return (

        <div>
          {notes.map(note => (
            <div key={notes.id}>
              {note.title}{note.content}
            </div>
          ))}
        </div>
      )

    }

    return (
      <>
        <p> Awaiting Notes...</p>
      </>
    )
  }

  return (

    <div>
      <h1>Create a page</h1>
      <form onSubmit={handleSubmit}>
        <input value={heading} placeholder="heading" onChange={(e) => setHeading(e.target.value)} />
        <br />
        <input value={body} placeholder="body" onChange={(e) => setBody(e.target.value)} />
        <br />
        <button type="submit">SUBMIT</button>
      </form>

      <Entry heading={submittedHeading} body={submittedBody} />

      <Note notes={notes} />
    </div>

  )

}

export default App