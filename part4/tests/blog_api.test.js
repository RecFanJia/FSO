//npm test -- tests/blog_api.test.js
require('dotenv').config()
const { test, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)
const initBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Zdsger W. Dijkstra",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Zdsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Zdsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 14,
    __v: 0
  }  
]

before(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initBlogs)
})

//4.8: Blog List Tests, step 1
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 6 blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initBlogs.length)
})

//4.9: Blog List Tests, step 2
test('the unique identifier property of the blog posts is named id, instead of _id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

//4.10: Blog List Tests, step 3
const newBlog = {
  "title": "Blog 2",
  "author": "FJ",
  "url": "http://example2.com",
  "likes": 55
}

test('a valid blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

})

test('if the number of blogs increased by 1', async () => {
  const responseBefore = await api.get('/api/blogs')
  const numberBefore= responseBefore.body.length
  await api
    .post('/api/blogs')
    .send(newBlog)
  const responseAfter = await api.get('/api/blogs')
  const numberAfter= responseAfter.body.length

assert.strictEqual(numberAfter, numberBefore + 1)
})

test('if the contents is correctly saved', async () => {
  await api
  .post('/api/blogs')
  .send(newBlog)
  const responseAfter = await api.get('/api/blogs')

  const title = responseAfter.body.map(r => r.title)
  const author = responseAfter.body.map(r => r.author)
  const url = responseAfter.body.map(r => r.url)
  const likes = responseAfter.body.map(r => r.likes)
  assert.ok(title.includes(newBlog.title))
  assert.ok(author.includes(newBlog.author))
  assert.ok(url.includes(newBlog.url))
  assert.ok(likes.includes(newBlog.likes))
})
//4.11*: Blog List Tests, step 4

test('if the likes property is missing from the request, it defaults to 0', async () => {
  const blogWithoutLikes = {
    title: "Blog without likes",
    author: "Author",
    url: "http://example.com"
  }

  const response = await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

//4.12*: Blog List tests, step 5

after(async () => {
  await mongoose.connection.close()
})

//npm test -- tests/blog_api.test.js
