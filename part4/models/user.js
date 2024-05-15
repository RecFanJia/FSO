const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // this ensures the uniqueness of username
        },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
    
    const orderedObject = {
        blogs: returnedObject.blogs,
        username: returnedObject.username,
        name: returnedObject.name,
        id: returnedObject.id
      };
      return orderedObject;

  }
})

const User = mongoose.model('User', userSchema)

module.exports = User