// MessageBox.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageBox from './../components/MessageBox';

describe('MessageBox', () => {
    it('sends user prompt when send button is clicked', () => {
      const mockSendUserPrompt = jest.fn();
      render(<MessageBox sendUserPrompt={mockSendUserPrompt} />);
      const input = screen.getByPlaceholderText('Message TritonHealthBot...');
      fireEvent.change(input, { target: { value: 'Test message' } });
      fireEvent.click(screen.getByTestId('send-button'));
      expect(mockSendUserPrompt).toHaveBeenCalledWith('Test message');
    });
  
    it('sends user prompt when Enter is pressed', () => {
      const mockSendUserPrompt = jest.fn();
      render(<MessageBox sendUserPrompt={mockSendUserPrompt} />);
      const input = screen.getByPlaceholderText('Message TritonHealthBot...');
      fireEvent.change(input, { target: { value: 'Test message' } });
      fireEvent.keyDown(input, { keyCode: 13 }); // Enter key
      expect(mockSendUserPrompt).toHaveBeenCalledWith('Test message');
    });
  });