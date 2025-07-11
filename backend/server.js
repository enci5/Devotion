require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes/notes')
const userRouter = require('./controllers/authentication/user')



app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/auth', userRouter)

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server runnning on port ${PORT}`)
})