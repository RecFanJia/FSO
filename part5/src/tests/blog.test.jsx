import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from '../components/Blog'
import blogsService from '../services/blogs'

vi.mock('../services/blogs')

describe('Blog component', () => {
  const blog = {
    id: '6648787a47e35929ad0f7c98',
    title: 'FishTorsk',
    author: 'Arne',
    url: 'fishblog.com',
    likes: 17,
    user: {
      id: '6644b440a7b2ffb1add000ec',
      username: 'RecFanJia',
      name: 'FanJia'
    }
  }

  const currentUser = {
    id: '6644b440a7b2ffb1add000ec',
    username: 'RecFanJia',
    name: 'FanJia'
  }

  it('Step 1a renders title and author by default', () => {
    render(<Blog blog={blog} currentUser={currentUser} updateBlog={() => {}} removeBlog={() => {}} />)

    const titleElement = screen.getByText(/FishTorsk/)
    expect(titleElement).toBeInTheDocument()
    const authorElement = screen.getByText(/Arne/)
    expect(authorElement).toBeInTheDocument()
  })

  it('Step 1b does not render url and likes by default', () => {
    render(<Blog blog={blog} currentUser={currentUser} updateBlog={() => {}} removeBlog={() => {}} />)

    const urlElement = screen.queryByText(/fishblog.com/)
    expect(urlElement).not.toBeInTheDocument()

    const likesElement = screen.queryByText(/17 likes/)
    expect(likesElement).not.toBeInTheDocument()
  })

  it('Step 2 renders url and likes after clicking the view button', async () => {
    render(<Blog blog={blog} currentUser={currentUser} updateBlog={() => {}} removeBlog={() => {}} />)

    const button = screen.getByText('view')
    await userEvent.click(button)

    const urlAfterClick = screen.getByText(/fishblog.com/)
    expect(urlAfterClick).toBeInTheDocument()

    const likesAfterClick = screen.getByText(/17 likes/)
    expect(likesAfterClick).toBeInTheDocument()
  })

  it('Step 3 calls event handler twice when like button is clicked twice', async () => {
    let likes = blog.likes

    // Mocking the updateBlog function
    const mockHandler = vi.fn().mockImplementation((updatedBlog) => {
      likes += 1
      return Promise.resolve({ ...updatedBlog, likes })
    })

    render(<Blog blog={blog} currentUser={currentUser} updateBlog={mockHandler} removeBlog={() => {}} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    console.log('Like button clicked once')

    await user.click(likeButton)
    console.log('Like button clicked twice')

    expect(mockHandler).toHaveBeenCalledTimes(2)
    console.log('Mock handler calls:', mockHandler.mock.calls)

  })
})
