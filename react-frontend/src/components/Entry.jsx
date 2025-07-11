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

export default Entry