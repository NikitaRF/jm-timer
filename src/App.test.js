import React from 'react';
import { render } from '@testing-library/react';
import Stopwatch from './Stopwatch';

test('renders learn react link', () => {
  const { getByText } = render(<Stopwatch />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
