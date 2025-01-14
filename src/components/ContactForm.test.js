import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/contact form/i)
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i)
        userEvent.type(firstName, 'one')

    const errorMessage = await screen.findAllByTestId('error')
        expect(errorMessage).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitBTN = screen.getByRole('button')
        userEvent.click(submitBTN);

    const errorMessage = await screen.findAllByTestId('error')
        expect(errorMessage).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i)
        userEvent.type(firstName, 'Shivneel')
    const lastName = screen.getByLabelText(/last name/i)
        userEvent.type(lastName, 'Prasad')
    const email = screen.getByLabelText(/email/i)
        userEvent.type(email, '')
    const submitBTN = screen.getByRole('button')
        userEvent.click(submitBTN)
      
    const errorMessage = await screen.findAllByTestId('error')
        expect(errorMessage).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByLabelText(/email/i)
        userEvent.type(email, 'ERROR')
    
    const errorMessage = await screen.findByText(/must be a valid email address/i)
        expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const submitBTN = screen.getByRole('button')
        userEvent.click(submitBTN)
    
    const errorMessage = await screen.findByText(/lastName is a required field/i)
        expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i)
        userEvent.type(firstName, 'Shivneel')
    const lastName = screen.getByLabelText(/last name/i)
        userEvent.type(lastName, 'Prasad')
    const email = screen.getByLabelText(/email/i)
        userEvent.type(email, 'SPrasad@gmail.com')
    const submitBTN = screen.getByRole('button')
        userEvent.click(submitBTN)
    
    await waitFor(() => {
        const first = screen.queryByText('Shivneel')
        const last = screen.queryByText('Prasad')
        const email = screen.queryByText('SPrasad@gmail.com')
        const message = screen.queryByText('m')

            expect(first).toBeInTheDocument()
            expect(last).toBeInTheDocument()
            expect(email).toBeInTheDocument()
            expect(message).not.toBeInTheDocument()
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i)
        userEvent.type(firstName, 'Shivneel')
    const lastName = screen.getByLabelText(/last name/i)
        userEvent.type(lastName, 'Prasad')
    const email = screen.getByLabelText(/email/i)
        userEvent.type(email, 'SPrasad@gmail.com')
    const message = screen.getByLabelText(/message/i)
        userEvent.type(message, 'Enter a Message Text Here')
    const submitBTN = screen.getByRole('button')
        userEvent.click(submitBTN)

    await waitFor(() => {
        const first = screen.queryByText('Shivneel')
        const last = screen.queryByText('Prasad')
        const email = screen.queryByText('SPrasad@gmail.com')
            expect(first).toBeInTheDocument()
            expect(last).toBeInTheDocument()
            expect(email).toBeInTheDocument()
    })
});