const express = require('express')
const notesRouter = express.Router()
const Note = require('../../models/note')

notesRouter.get('/', (req, res)=>{
    Note.find({}).then(notes=>{
        res.json(notes)
    })
})

notesRouter.post('/', async (req,res) =>{
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

module.exports = notesRouter