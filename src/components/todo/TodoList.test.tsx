import { render, screen } from '@testing-library/react';
import React from 'react';

import { TodoList } from './TodoList';

describe('TodoList', () => {
  test('renders the title correctly', () => {
    render(<TodoList title="My Todo List">Child content</TodoList>);
    expect(screen.getByText('My Todo List')).toBeInTheDocument();
  });

  test('renders children content', () => {
    render(<TodoList title="Test">Child content</TodoList>);
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    const { container } = render(<TodoList title="Test">Child content</TodoList>);
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass('min-h-screen bg-gray-100 flex justify-center items-start py-12');
    
    const innerDiv = outerDiv.firstChild as HTMLElement;
    expect(innerDiv).toHaveClass('w-full max-w-3xl bg-white shadow-lg rounded-lg p-8');
  });

  test('renders h1 with correct CSS classes', () => {
    render(<TodoList title="Test">Child content</TodoList>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-2xl font-bold mb-6 text-gray-900');
  });
});