import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './../components/Header';

// Mocking the image import
jest.mock('../media/img/logo.png', () => 'test-logo-path');

describe('Header', () => {
  it('renders the logo with the correct attributes', () => {
    render(<Header />);
    const logoImg = screen.getByRole('img', { name: /logo/i });
    expect(logoImg).toHaveAttribute('src', 'test-logo-path');
    expect(logoImg).toHaveAttribute('alt', 'logo');
  });

  it('displays the correct header text', () => {
    render(<Header />);
    expect(screen.getByText('TritonHealthBot')).toBeInTheDocument();
  });

  it('renders the ClearChatButton component', () => {
    render(<Header />);
    // Assuming ClearChatButton renders a button with specific text or role
    // Adjust the query as needed based on the actual content or accessibility features of ClearChatButton
    expect(screen.getByRole('button', { name: /clear chat/i })).toBeInTheDocument();
  });
});
