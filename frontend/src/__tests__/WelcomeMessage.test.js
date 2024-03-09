import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomeMessage from './../components/WelcomeMessage'; // Adjust the import path as necessary

// Mocking the icon import
jest.mock('../media/img/icon-bot.png', () => 'test-icon-path');

describe('WelcomeMessage', () => {
  it('renders the icon with correct attributes', () => {
    render(<WelcomeMessage />);
    const iconImg = screen.getByRole('img', { name: /icon/i });
    expect(iconImg).toHaveAttribute('src', 'test-icon-path');
    expect(iconImg).toHaveAttribute('alt', 'Icon');
  });

  it('displays the correct welcome message', () => {
    render(<WelcomeMessage />);
    expect(screen.getByText('Welcome to the TritonHealthBot! Please ask me any questions about UCSD health resources!')).toBeInTheDocument();
  });

  it('displays the "Trending Topics" header', () => {
    render(<WelcomeMessage />);
    expect(screen.getByText('Trending Topics')).toBeInTheDocument();
  });

  it('renders the TrendingTopic component with buttons', () => {
    render(<WelcomeMessage sendUserPrompt={() => {}} />);
    expect(screen.getByText('Wellness')).toBeInTheDocument();
    expect(screen.getByText('Anxiety')).toBeInTheDocument();
    expect(screen.getByText('CAPS')).toBeInTheDocument();
  });

  // Optional: Testing interaction with TrendingTopic buttons
  it('calls sendUserPrompt when a TrendingTopic button is clicked', () => {
    const mockSendUserPrompt = jest.fn();
    render(<WelcomeMessage sendUserPrompt={mockSendUserPrompt} />);
    fireEvent.click(screen.getByText('Wellness'));
    expect(mockSendUserPrompt).toHaveBeenCalledWith("What are some tips for wellness?");
  });
});
