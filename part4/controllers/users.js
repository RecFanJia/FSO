const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET all users
usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1, author: 1, url: 1, likes: 1
    })
    response.json(users)
  } catch (error) {
    next(error)
  }
})

// POST a new user
usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'Password must be at least 3 characters long' })
  }

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({ error: 'Username must be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})
// PUT update user by username
usersRouter.put('/:username', async (request, response, next) => {
    const { username } = request.params
    const { name, password } = request.body
  
    if (password && password.length < 3) {
      return response.status(400).json({ error: 'Password must be at least 3 characters long' })
    }
  
    try {
      const userToUpdate = await User.findOne({ username })
      if (!userToUpdate) {
        return response.status(404).json({ error: 'User not found' })
      }
  
      if (password) {
        const saltRounds = 10
        userToUpdate.passwordHash = await bcrypt.hash(password, saltRounds)
      }
  
      if (name) {
        userToUpdate.name = name
      }
  
      const updatedUser = await userToUpdate.save()
      response.json(updatedUser)
    } catch (error) {
      next(error)
    }
  })
  
  // DELETE user by username
  usersRouter.delete('/:username', async (request, response, next) => {
    const { username } = request.params
  
    try {
      const userToDelete = await User.findOne({ username })
      if (!userToDelete) {
        return response.status(404).json({ error: 'User not found' })
      }
  
      await User.deleteOne({ username })
      response.status(204).end()
    } catch (error) {
      next(error)
    }
  })

module.exports = usersRouter