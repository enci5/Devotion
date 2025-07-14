import { useState, useEffect } from 'react'
import noteService from '../services/note'
import Entry from '../components/Entry'
import Note from '../components/Note'

const CreateNote = () => {
    // save clicks of each button to its own state    
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [submittedTitle, setSubmittedTitle] = useState("")
    const [submittedContent, setSubmittedContent] = useState("")
    const [notes, setNotes] = useState([])

    console.log("Title --> ", title)
    console.log("Content-> ", content)

    const token = localStorage.getItem('token');

    //Fetching the notes on page mount
    // Only fetched once/ LOADS NOTES ONCE

    useEffect(() => {
        fetchNotes();
    }, []);


    // Fetch notes function so it is inside of a component 
    // Helper to refetch notes after any update
    const fetchNotes = () => {
        noteService.getAll(token).then(initialNotes => {
            setNotes(initialNotes);
        })
    }

    console.log("THESE ARE THE NOTES AFTER USEEFFECT", notes)

    const handleSubmit = (e) => {
        console.log("<-----------------------------INSIDE HANDLE SUBMIT----------------------------->")


        e.preventDefault()

        setSubmittedTitle(title)
        setSubmittedContent(content)

        console.log("The Current tile to submit", submittedTitle)
        //console.log("THE CURRENT SAVED TOKEN ON THIS PAGE IS", token)

        const noteObject = {
            title: title,
            content: content
        }

        noteService
            .create(noteObject, token)
            .then(result => {
                if (result.success) {
                    console.log("Note Created:", result.data)
                    //Refreshing the notes after submission so the notes are re-rendered
                    fetchNotes()
                } else {
                    console.log("Error Creating Note.", result.data)
                }
            })
            .catch(error => {
                console.error("Unexpected:", error);
            });

    }

    return (

        <div>
            <h1>Create a page</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                <br />
                <input value={content} placeholder="Note" onChange={(e) => setContent(e.target.value)} />
                <br />
                <button type="submit">SUBMIT</button>
            </form>

            <Entry title={submittedTitle} content={submittedContent} />

            <Note notes={notes} />
        </div>

    )
}

export default CreateNote