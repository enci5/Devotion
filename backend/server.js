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

app.post('/api/notes', async (req,res) =>{
    const title = req.body.title
    const content = req.body.content
    
    const note = new Note({
        title:title,
        content:content
    })
    try {
        await note.save()
        res.status(200).json(`${title} is added to the database`)
        console.log(`Added ${title} to database`)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: 'Bad Request'})
    }
    
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server runnning on port ${PORT}`)
})