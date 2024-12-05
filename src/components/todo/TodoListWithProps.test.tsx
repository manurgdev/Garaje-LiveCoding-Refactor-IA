import { render, screen } from '@testing-library/react';
import React from 'react';

import { TodoListWithProps } from './TodoListWithProps';

describe('TodoListWithProps', () => {
  test('renders the title correctly', () => {
    render(<TodoListWithProps title="My Todo List">Child content</TodoListWithProps>);
    expect(screen.getByText('My Todo List')).toBeInTheDocument();
  });

  test('renders children content', () => {
    render(<TodoListWithProps title="Test">Child content</TodoListWithProps>);
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  test('renders userFilter when provided', () => {
    render(
      <TodoListWithProps title="Test" userFilter={<div>User Filter</div>}>
        Child content
      </TodoListWithProps>
    );
    expect(screen.getByText('User Filter')).toBeInTheDocument();
  });

  test('renders statusFilter when provided', () => {
    render(
      <TodoListWithProps title="Test" statusFilter={<div>Status Filter</div>}>
        Child content
      </TodoListWithProps>
    );
    expect(screen.getByText('Status Filter')).toBeInTheDocument();
  });

  test('renders todoInput when provided', () => {
    render(
      <TodoListWithProps title="Test" todoInput={<input placeholder="Add todo" />}>
        Child content
      </TodoListWithProps>
    );
    expect(screen.getByPlaceholderText('Add todo')).toBeInTheDocument();
  });
});