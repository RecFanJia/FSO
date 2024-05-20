import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

describe('BlogForm component', () => {
  it('Step 4 calls the event handler it received as props with the right details when a new blog is created', () => {
    const createBlog = vi.fn()
    const user = { id: '1', username: 'testuser', name: 'Test User' }

    render(<BlogForm createBlog={createBlog} user={user} handleCancel={() => {}} />)

    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')
    const form = screen.getByTestId('blog-form')

    fireEvent.change(titleInput, { target: { value: 'test title' } })
    fireEvent.change(authorInput, { target: { value: 'test author' } })
    fireEvent.change(urlInput, { target: { value: 'test url' } })

    fireEvent.submit(form)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith({
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 0,
      user: { id: '1', username: 'testuser', name: 'Test User' }
    })
  })
})


