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

  test('renders userFilter when provided', () => {
    render(
      <TodoList title="Test" userFilter={<div>User Filter</div>}>
        Child content
      </TodoList>
    );
    expect(screen.getByText('User Filter')).toBeInTheDocument();
  });

  test('renders statusFilter when provided', () => {
    render(
      <TodoList title="Test" statusFilter={<div>Status Filter</div>}>
        Child content
      </TodoList>
    );
    expect(screen.getByText('Status Filter')).toBeInTheDocument();
  });

  test('renders todoInput when provided', () => {
    render(
      <TodoList title="Test" todoInput={<input placeholder="Add todo" />}>
        Child content
      </TodoList>
    );
    expect(screen.getByPlaceholderText('Add todo')).toBeInTheDocument();
  });
});