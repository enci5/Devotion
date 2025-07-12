const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    name:String,
    email: String,
    hashedPassword:String,
    notes:[ {type:mongoose.Schema.Types.ObjectId, ref: 'Note'}] 

})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = new mongoose.model('User', UserSchema)