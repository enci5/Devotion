require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes/notes')

app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server runnning on port ${PORT}`)
})