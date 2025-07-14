const Entry = ({ title, content }) => {

  if (title || content) {
    return (
      <>
        <h2>
          {title}
        </h2>
        <p>
          {content}
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

export default Entry