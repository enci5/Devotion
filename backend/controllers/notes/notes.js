const express = require('express')
const notesRouter = express.Router()
const Note = require('../../models/note')
const User = require('../../models/user')
const authMiddleware = require('../../middleware/authMiddleware')

notesRouter.get('/', authMiddleware, async(req, res)=>{
    const userId = req.user.id

    try {
        const userNotes = await User.findById(userId).populate('notes', 'title content')
        res.json({
            success: true,
            message: 'User notes retrieved',
            data: userNotes.notes
        })
    } catch (error) {
        res.status(401).json({success: false, message: 'cannot retrieve notes', data:null})
    }
})

notesRouter.post('/', authMiddleware, async (req,res) =>{
    const { title, content } = req.body
    const userId = req.user.id
    
    const note = new Note({
        title:title,
        content:content,
        user: userId
    })
    try {
        const savedNote = await note.save()
        console.log(`Added ${title} to database`)
        const user = await User.findById(userId)
        user.notes = user.notes.concat(savedNote._id)
        await user.save()
        console.log(`Added notes to user db`)
        res.status(200).json(`${title} is added to the database`)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: 'Bad Request'})
    }
    
})

module.exports = notesRouter