import React from 'react';
import { render } from '@testing-library/react';
import Homepage from './components/Homepage';

test('renders learn react link', () => {
  const { getByText } = render(<Homepage />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
