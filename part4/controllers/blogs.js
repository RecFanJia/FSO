const express = require('express');
const Blog = require('../models/blog');
const blogsRouter = express.Router();

// 获取所有博客
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// 创建新博客
blogsRouter.post('/', async (req, res, next) => {
  const { title, url, author, likes } = req.body

  if (!title || !url) {
    return res.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0
  })

  try {
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

// 删除博客
blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;