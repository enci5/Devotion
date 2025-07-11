const Note = ({ notes }) => {

  if (notes) {
    return (

      <div>
        <h3>Notes from server</h3>
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

export default Note