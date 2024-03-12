// ClearChatButton.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClearChatButton from './../components/ClearChatButton';

describe('ClearChatButton', () => {
  it('calls clearChat function when clicked', () => {
    const mockClearChat = jest.fn();
    render(<ClearChatButton clearChat={mockClearChat} />);
    fireEvent.click(screen.getByText('Clear chat'));
    expect(mockClearChat).toHaveBeenCalledTimes(1);
  });
});
