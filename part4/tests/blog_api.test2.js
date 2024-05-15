//npm test -- tests/blog_api.test2.js
require('dotenv').config();
const { test, before, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const api = supertest(app);
let token;
let userId;

const initBlogs = [
  {
    title: "React patterns",
    author: "Zdsger W. Dijkstra",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Zdsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Zdsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 14,
  }
];

before(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = new User({ username: 'root', passwordHash: 'sekret' });
  await user.save();

  userId = user._id;

  const userForToken = { username: user.username, id: user._id };
  token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });

  const blogsWithUser = initBlogs.map(blog => ({ ...blog, user: user._id }));
  await Blog.insertMany(blogsWithUser);
});

describe('When GET from the server', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, initBlogs.length);
  });

  test('the unique identifier property of the blog posts is named id, instead of _id', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;

    blogs.forEach(blog => {
      assert.ok(blog.id);
      assert.strictEqual(blog._id, undefined);
    });
  });
});

describe('When POST to server', () => {
  const newBlog = {
    title: "Blog 2",
    author: "FJ",
    url: "http://example2.com",
    likes: 55
  };

  test('a valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('if the number of blogs increased by 1', async () => {
    const responseBefore = await api.get('/api/blogs');
    const numberBefore = responseBefore.body.length;

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);

    const responseAfter = await api.get('/api/blogs');
    const numberAfter = responseAfter.body.length;

    assert.strictEqual(numberAfter, numberBefore + 1);
  });

  test('if the contents is correctly saved', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);

    const responseAfter = await api.get('/api/blogs');

    const titles = responseAfter.body.map(r => r.title);
    const authors = responseAfter.body.map(r => r.author);
    const urls = responseAfter.body.map(r => r.url);
    const likes = responseAfter.body.map(r => r.likes);

    assert.ok(titles.includes(newBlog.title));
    assert.ok(authors.includes(newBlog.author));
    assert.ok(urls.includes(newBlog.url));
    assert.ok(likes.includes(newBlog.likes));
  });

  test('fails with status code 401 if token is not provided', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);

    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, initBlogs.length);
  });
});

describe('When DELETE from server', () => {
  test('a blog can be deleted', async () => {
    const response = await api.get('/api/blogs');
    const blogToDelete = response.body[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const responseAfter = await api.get('/api/blogs');
    const titles = responseAfter.body.map(r => r.title);

    assert.strictEqual(responseAfter.body.length, initBlogs.length - 1);
    assert.ok(!titles.includes(blogToDelete.title));
  });
});

//describe('When UPDATE on server', () => {
//  test('a blog can be updated', async () => {
//    const response = await api.get('/api/blogs');
//    const blogs = response.body;
//
//    // 从数组中随机选择一个博客
//    const randomIndex = Math.floor(Math.random() * blogs.length);
//    const blogToUpdate = blogs[randomIndex];
//
//    const updatedBlog = {
//      title: "Updated title",
//      author: "Updated author",
//      url: "http://updated.com",
//      likes: 999
//    };
//
//    const updatedResponse = await api
//      .put(`/api/blogs/${blogToUpdate.id}`)
//      .send(updatedBlog)
//      .expect(200)
//      .expect('Content-Type', /application\/json/);
//
//    assert.strictEqual(updatedResponse.body.title, updatedBlog.title);
//    assert.strictEqual(updatedResponse.body.author, updatedBlog.author);
//    assert.strictEqual(updatedResponse.body.url, updatedBlog.url);
//    assert.strictEqual(updatedResponse.body.likes, updatedBlog.likes);
//  });
//});

after(async () => {
  await mongoose.connection.close();
});