import { render, screen, fireEvent  } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders title and author, but not url or likes by default', () => {
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
  };

  const user = {
    id: '123',
    name: 'test user'
  };

  render(<Blog blog={blog} user={user} updateBlog={() => {}} removeBlog={() => {}} />);

  // Check that title and author are rendered
  const titleElement = screen.getByText('test title for rendering');
  expect(titleElement).toBeInTheDocument();
  const authorElement = screen.getByText('test author');
  expect(authorElement).toBeInTheDocument();

  // Check that url and likes are not rendered by default
  const urlElement = screen.queryByText('bushi.com');
  expect(urlElement).not.toBeInTheDocument();

  const likesElement = screen.queryByText('123 likes');
  expect(likesElement).not.toBeInTheDocument();

  // Simulate clicking the view button to show details
  const button = screen.getByText('view');
  fireEvent.click(button);

  // Check that url and likes are rendered after clicking the view button
  const urlAfterClick = screen.getByText('bushi.com');
  expect(urlAfterClick).toBeInTheDocument();

  const likesAfterClick = screen.getByText('123 likes');
  expect(likesAfterClick).toBeInTheDocument();
});