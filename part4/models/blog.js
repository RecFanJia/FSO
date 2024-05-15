const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    const orderedObject = {
      url: returnedObject.url,
      title: returnedObject.title,
      author: returnedObject.author,
      likes: returnedObject.likes,
      user: returnedObject.user,
      id: returnedObject.id
    };
    return orderedObject;
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;