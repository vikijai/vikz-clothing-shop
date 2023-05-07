import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ContactUsForm from './ContactUsForm';

jest.mock('../../../utils/fetchApi', () => ({
  fetchApi: jest.fn().mockResolvedValue({ statusCode: 200, type: 'success' })
}));
describe('ContactUsPage', () => {
  it('post the data todb.json', () => {
    // render the contact form page
    render(
      <HashRouter>
        <ContactUsForm />
      </HashRouter>
    );
    // getByLabeltext and to have the attribute with the respective type
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitBtn = screen.getByTestId('submitBtn');

    // Assert
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    expect(nameInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(messageInput).toHaveAttribute('type', 'text');
    expect(submitBtn).toHaveAttribute('type', 'submit');
  });

  it('onclick fireEvent to check the post data', async () => {
    // render the contact form page
    render(<ContactUsForm />);
    const submitButton = screen.getByTestId('submitBtn');

    fireEvent.input(screen.getByLabelText('Name'), { target: { value: 'John' } });
    fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.input(screen.getByLabelText('Message'), { target: { value: 'Hello, World!' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Saved Successfully')).toBeInTheDocument();
    });
  });

  it('should display an error message if the API call fails', async () => {
    // Mock the fetchApi function to return an error response
    jest.mock('../../../utils/fetchApi', () => ({
      fetchApi: jest.fn().mockRejectedValue(new Error('Network Error'))
    }));
    // render the contact form page
    render(<ContactUsForm />);
    const submitButton = screen.getByTestId('submitBtn');

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello, World!' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('formFailure')).toBeInTheDocument();
    });
  });

  it('Has right snapshot with all requirments', () => {
    // to take snapshot for the contactUsForm
    const snapshotInJson = renderer.create(<ContactUsForm />).toJSON();
    // lets assert to match the snapshot
    expect(snapshotInJson).toMatchSnapshot();
  });
});
