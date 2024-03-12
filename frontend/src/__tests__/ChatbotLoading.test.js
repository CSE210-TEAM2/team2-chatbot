// ChatbotLoading.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatbotLoading from './../components/ChatbotLoading'; // Adjust the import path as necessary

test('renders three dots for the loading animation', () => {
  const { container } = render(<ChatbotLoading />);
  const dots = container.querySelectorAll('.dot'); // Use the actual class name here
  expect(dots.length).toBe(3);
});
