// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import { authStore } from 'src/shared/store';
// import { SignIn } from './SignIn';

// jest.mock('src/shared/store', () => ({
//   authStore: {
//     signIn: jest.fn(),
//   },
// }));

// describe('SignIn component', () => {
//   it('should render the sign-in form and submit successfully', async () => {
//     const { getByLabelText, getByText } = render(<SignIn />);

//     // Fill in the form inputs
//     fireEvent.change(getByLabelText('Имя пользователя'), { target: { value: 'testUser' } });
//     fireEvent.change(getByLabelText('Пароль'), { target: { value: 'testPassword' } });

//     // Submit the form
//     fireEvent.click(getByText('Войти'));

//     // Wait for the submission to complete
//     await waitFor(() => expect(authStore.signIn).toHaveBeenCalledTimes(1));

//     // Assert that the signIn function was called with the correct values
//     expect(authStore.signIn).toHaveBeenCalledWith({ username: 'testUser', password: 'testPassword' });
//   });

//   it('should display an error message when sign-in fails', async () => {
//     // Mock the signIn function to throw an error
//     authStore.signIn.   (new Error('Invalid password'));

//     const { getByLabelText, getByText, queryByText } = render(<SignIn />);

//     // Fill in the form inputs
//     fireEvent.change(getByLabelText('Имя пользователя'), { target: { value: 'testUser' } });
//     fireEvent.change(getByLabelText('Пароль'), { target: { value: 'incorrectPassword' } });

//     // Submit the form
//     fireEvent.click(getByText('Войти'));

//     // Wait for the submission to complete
//     await waitFor(() => expect(authStore.signIn).toHaveBeenCalledTimes(1));

//     // Assert that the error message is displayed
//     expect(queryByText('Неверный пароль')).toBeInTheDocument();
//   });
// });
