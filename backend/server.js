require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.json())

app.get('/api/notes', (req, res)=>{
    Note.find({}).then(notes=>{
        res.json(notes)
    })
})

const PORT =3001
app.listen(PORT, ()=>{
    console.log(`Server runnning on port ${PORT}`)
})