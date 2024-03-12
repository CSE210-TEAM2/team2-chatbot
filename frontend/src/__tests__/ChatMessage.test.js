import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatMessage from './../components/ChatMessage';

// Mocks
jest.mock('./../components/ChatbotLoading', () => () => <div>Loading...</div>);
jest.mock('marked', () => ({
  parse: (text) => `Parsed markdown: ${text}`,
}));

describe('ChatMessage', () => {
  it('renders user messages correctly', () => {
    render(<ChatMessage role="user" text="User message" status="ok" sources={[]} />);
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('User message')).toBeInTheDocument();
  });

  it('renders bot messages correctly', () => {
    const sources = [
      { metadata: { source: 'source1', page: 10 } },
      { metadata: { source: 'source2', page: 20 } }
    ];
    render(<ChatMessage role="bot" text="Bot message" status="ok" sources={sources} />);
    expect(screen.getByText('TritonHealthBot')).toBeInTheDocument();
    expect(screen.getByText('Parsed markdown: Bot message')).toBeInTheDocument();
    sources.forEach((src) => {
      expect(screen.getByText(`${src.metadata.source}, page ${src.metadata.page}`, { selector: 'a' })).toBeInTheDocument();
    });
  });

  it('renders loading state for bot', () => {
    render(<ChatMessage role="bot" status="loading" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state for bot', () => {
    render(<ChatMessage role="bot" text="Error message" status="error" sources={[]} />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toHaveClass('error'); // Update 'error' with the correct class name if it's different
  });
});
