const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');
const blogsRouter = express.Router();
const jwt = require('jsonwebtoken')

// 获取所有博客
blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

// 创建新博客
blogsRouter.post('/', async (request, response, next) => {
  const { url, title, author, likes } = request.body;

  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch (error) {
    return next(error);
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(401).json({ error: 'invalid user' });
  }

  // 验证输入数据
  if (!url || !title || !author) {
    return response.status(400).json({ error: 'url, title, and author are required' });
  }

  try {
    const blog = new Blog({
      url,
      title,
      author,
      user: user._id, // 将博客与用户关联
      likes: likes || 0
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// 删除博客
blogsRouter.delete('/:id', async (req, res, next) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(req.token, process.env.SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'token invalid or expired' });
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    const user = await User.findById(decodedToken.id);
    user.blogs = user.blogs.filter(blogId => blogId.toString() !== req.params.id);
    await user.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;