import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TrendingTopic from './../components/TrendingTopic'; // Adjust the import path as necessary

describe('TrendingTopic', () => {
  const mockSendUserPrompt = jest.fn();

  beforeEach(() => {
    render(<TrendingTopic sendUserPrompt={mockSendUserPrompt} />);
  });

  afterEach(() => {
    mockSendUserPrompt.mockClear();
  });

  it('renders buttons for all topics', () => {
    expect(screen.getByText('Wellness')).toBeInTheDocument();
    expect(screen.getByText('Anxiety')).toBeInTheDocument();
    expect(screen.getByText('CAPS')).toBeInTheDocument();
  });

  it('calls sendUserPrompt with "What are some tips for wellness?" when the Wellness button is clicked', () => {
    fireEvent.click(screen.getByText('Wellness'));
    expect(mockSendUserPrompt).toHaveBeenCalledWith("What are some tips for wellness?");
  });

  it('calls sendUserPrompt with "What are some tips for anxiety?" when the Anxiety button is clicked', () => {
    fireEvent.click(screen.getByText('Anxiety'));
    expect(mockSendUserPrompt).toHaveBeenCalledWith("What are some tips for anxiety?");
  });

  it('calls sendUserPrompt with "Can you give me information about CAPS?" when the CAPS button is clicked', () => {
    fireEvent.click(screen.getByText('CAPS'));
    expect(mockSendUserPrompt).toHaveBeenCalledWith("Can you give me information about CAPS?");
  });
});
