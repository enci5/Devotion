const Note = ({ notes }) => {
  console.log("NOTES", notes)

  if (Array.isArray(notes.data) && notes.data.length > 0) {
    return (
      <div>
        <h3>Notes from server</h3>
        {notes.data.map(note => (
          <div key={note.id}>
            <strong>{note.title}</strong>: {note.content}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <p>Awaiting Notes...</p>
    </>
  )
}

export default Note