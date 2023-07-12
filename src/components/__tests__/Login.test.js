import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { MemoryRouter } from "react-router-dom";

test('logs in successfully with valid credentials', async () => {
  // Mock the login function to return a user object
  const mockLogin = jest.fn().mockResolvedValue({
   
    username: 'admin',
    password: '123456789',
    // Include other user attributes as needed
  });

  // Render the login form with the mock login function
  render( <MemoryRouter>
    <Login />
  </MemoryRouter>);

  // Get the username and password input fields
  const username = screen.getByLabelText('');
  const password = screen.getByLabelText('');

  // Set the input field values
  fireEvent.change(username, { target: { value: 'testuser' } });
  fireEvent.change(password, { target: { value: 'testpassword' } });

  // Submit the form
  fireEvent.click(screen.getByText('Login'));

  // Wait for the login function to resolve
  await waitFor(() => expect(mockLogin).toHaveBeenCalledTimes(1));

  // Check if the user object is returned
  const user = mockLogin.mock.results[0].value;
  expect(user).toBeDefined();
/*   expect(user.id).toBe(1); */
  expect(user.username).toBe('admin');
  expect(user.email).toBe('lmjg@gmail.com');
  // Check other user attributes as needed

  render(
    <MemoryRouter> {/* Wrap the component with the Router */}
      <Login login={mockLogin} />
    </MemoryRouter>
  );
});

test("input field user name has correct type", () => {
  render(  <MemoryRouter>
    <Login />
  </MemoryRouter>);
  
  // Find the input field by its name attribute
  const username = screen.getByLabelText("textbox", { name: "Username" });

  // Assert that the input field has the correct type attribute
  expect(username).toHaveAttribute("type", "text");
});

test("input field password has correct type", () => {
  render(  <MemoryRouter>
    <Login />
  </MemoryRouter>);
  
  // Find the input field by its name attribute
  const password = screen.getByLabelText("password", { name: "password" });

  // Assert that the input field has the correct type attribute
  expect(password).toHaveAttribute("type", "password");
});