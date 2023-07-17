import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';
import { MemoryRouter } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};



jest.mock('../../services/auth.service');


test("input field user name has correct type", () => {
  render(  
  <MemoryRouter>
    <Login />
  </MemoryRouter>);
  
  const username = screen.getByLabelText("Username");

  expect(username).toHaveAttribute("type", "text");
});

test("input field password has correct type", () => {
  render(
      <MemoryRouter>
    <Login />
  </MemoryRouter>);
  
  const password = screen.getByLabelText("Password");

  expect(password).toHaveAttribute("type", "password");
});