import { useState, useEffect } from 'react'
import noteService from '../services/note'
import Entry from '../components/Entry'
import Note from '../components/Note'

const CreateNote = () =>{
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

export default CreateNote