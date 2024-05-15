const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');
const blogsRouter = express.Router();

// 获取所有博客
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

// 创建新博客
blogsRouter.post('/', async (req, res, next) => {
  const { title, url, author, likes } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: 'title or url missing' });
  }

  try {
    // 找到第一个用户
    const user = await User.findOne({});
    if (!user) {
      return res.status(400).json({ error: 'No users found in the database' });
    }

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
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// 更新博客
blogsRouter.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const userId = req.user._id;

  const updatedBlogData = {
    title,
    author,
    url,
    likes,
    user: userId
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedBlogData,
      { new: true, runValidators: true, context: 'query' }
    ).populate('user', { username: 1, name: 1 });
    if (updatedBlog) {
      res.json(updatedBlog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

// 删除博客
blogsRouter.delete('/:id', async (req, res, next) => {
  const userId = req.user._id;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.user.toString() !== userId.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    const user = await User.findById(userId);
    user.blogs = user.blogs.filter(blogId => blogId.toString() !== req.params.id);
    await user.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;