//npm test -- tests/blog_api.test.js
require('dotenv').config()
const { test, before, after, beforeEach, describe } = require('node:test')
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


describe('When GET from the server', () => {
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
})





//4.10: Blog List Tests, step 3
describe('When POST to server', () => {
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

describe('when there is something missing in the add request', () => {
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
  test('if the title property is missing, return 400 Bad Request', async () => {
    const blogWithoutTitle = {
      author: "Author",
      url: "http://example.com"
    }
  
    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
  })
  
  test('if the url property is missing, return 400 Bad Request', async () => {
    const blogWithoutUrl = {
      title: "Blog without URL",
      author: "Author"
    }
  
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
  })
})
})


// 测试删除博客
describe('When DELETE from server', () => {
  test('a blog can be deleted', async () => {
    const response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const responseAfter = await api.get('/api/blogs')
    const titles = responseAfter.body.map(r => r.title)
  
    assert.strictEqual(responseAfter.body.length, initBlogs.length - 1)
    assert.ok(!titles.includes(blogToDelete.title))
  })
})


// 测试更新博客
describe('When UPDATE on server', () => {
test('a blog can be updated', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  // 从数组中随机选择一个博客
  const randomIndex = Math.floor(Math.random() * blogs.length)
  const blogToUpdate = blogs[randomIndex]

  const updatedBlog = {
    title: "Updated title",
    author: "Updated author",
    url: "http://updated.com",
    likes: 999
  }

  const updatedResponse = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(updatedResponse.body.title, updatedBlog.title)
  assert.strictEqual(updatedResponse.body.author, updatedBlog.author)
  assert.strictEqual(updatedResponse.body.url, updatedBlog.url)
  assert.strictEqual(updatedResponse.body.likes, updatedBlog.likes)
})
})


after(async () => {
  await mongoose.connection.close()
})

//npm test -- tests/blog_api.test.js
