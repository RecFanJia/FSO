const {test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
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
      likes: 2,
      __v: 0
    }  
  ]

  const listWithAuthorHasSameBlogsAndLikes = [
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

describe('dummy', () => {
  test('dummy returns one', () => {
      const blogs = []
    
      const result = listHelper.dummy(blogs)
      assert.strictEqual(result, 1)
    })
})
describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when list has many blogs, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        assert.strictEqual(result, 36)
      })
  })

describe('favorite blog', () => {
  test('when list has only one blog, the favorite blog is', () => {
    const result = listHelper.favoBlog(listWithOneBlog)
    assert.deepStrictEqual(result, 
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )
  })

  test('when list has many blogs, the favorite blog is', () => {
      const result = listHelper.favoBlog(listWithManyBlogs)
      assert.deepStrictEqual(result,    
          {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    )
    })
})

describe('most blogs', () => {
  test('the author has the most blogs is', () => {
      const result = listHelper.mostBlogs(listWithManyBlogs)
      assert.deepStrictEqual(result,    
          {
            author: "Robert C. Martin",
            blogs: 3
      }
    )
    })
    test('When two has the same blogs,the author has the most blogs is who comes the first in the list, ', () => {
      const result = listHelper.mostBlogs(listWithAuthorHasSameBlogsAndLikes)
      assert.deepStrictEqual(result,    
          {
            author: "Zdsger W. Dijkstra",
            blogs: 3
      }
    )
    })
})

describe('most likes', () => {
  test('the author has the most likes is', () => {
      const result = listHelper.mostLikes(listWithManyBlogs)
      assert.deepStrictEqual(result,    
          {
            author: "Edsger W. Dijkstra",
            likes: 17
      }
    )
    })
    test('When two authors has the likes,the author has the most blogs is who comes the first in the list, ', () => {
      const result = listHelper.mostLikes(listWithAuthorHasSameBlogsAndLikes)
      assert.deepStrictEqual(result,    
          {
            author: "Zdsger W. Dijkstra",
            likes: 24
      }
    )
    })
})
