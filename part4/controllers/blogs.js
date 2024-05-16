const express = require('express');
const Blog = require('../models/blog');
const blogsRouter = express.Router();

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

  const user = request.user;
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
blogsRouter.delete('/:id', async (request, response, next) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'invalid user' });
  }

  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    await Blog.findByIdAndDelete(request.params.id);

    user.blogs = user.blogs.filter(blogId => blogId.toString() !== request.params.id);
    await user.save();

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;