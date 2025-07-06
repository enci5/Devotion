import { useState } from 'react'


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

  console.log("Heading --> ", heading)
  console.log("Body-> ", body)

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
    </div>

  )

}

export default App