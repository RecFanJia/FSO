import { render, screen, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('Blog component', () => {
  const blog = {
    id: '1',
    title: 'test title for rendering',
    author: 'test author',
    url: 'bushi.com',
    likes: 123,
    user: {
      id: '123',
      name: 'test user'
    }
  }

  const user = {
    id: '123',
    name: 'test user'
  }

  it('renders title and author by default', () => {
    render(<Blog blog={blog} user={user} updateBlog={() => {}} removeBlog={() => {}} />)

    const titleElement = screen.getByText(/test title for rendering/)
    expect(titleElement).toBeInTheDocument()
    const authorElement = screen.getByText(/test author/)
    expect(authorElement).toBeInTheDocument()
  })

  it('does not render url and likes by default', () => {
    render(<Blog blog={blog} user={user} updateBlog={() => {}} removeBlog={() => {}} />)

    const urlElement = screen.queryByText('bushi.com')
    expect(urlElement).not.toBeInTheDocument()

    const likesElement = screen.queryByText('123 likes')
    expect(likesElement).not.toBeInTheDocument()
  })

  it('renders url and likes after clicking the view button', () => {
    render(<Blog blog={blog} user={user} updateBlog={() => {}} removeBlog={() => {}} />)

    const button = screen.getByText('view')
    fireEvent.click(button)

    const urlAfterClick = screen.getByText('bushi.com')
    expect(urlAfterClick).toBeInTheDocument()

    const likesAfterClick = screen.getByText('123 likes')
    expect(likesAfterClick).toBeInTheDocument()
  })
})
