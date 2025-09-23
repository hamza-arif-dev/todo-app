import { BadRequestException, Injectable } from '@nestjs/common';
import { Todo, TodoCreate, TodoUpdate } from '@todo-app/types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  createTodo(todoCreate: TodoCreate): Todo {
    const todo: Todo = {
      id: uuid(),
      title: todoCreate.title,
      description: todoCreate.description,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      isDone: false,
      isArchived: false
    };

    this.todos.push(todo);

    return this.todos.at(-1);
  }

  findAllTodos(): Todo[] {
    return this.todos;
  }

  updateTodo(id: string, todoUpdate: TodoUpdate): Todo {
    const todoIndex = this.todos.findIndex(it => it.id === id);
    if (todoIndex === -1) {
      throw new BadRequestException('invalid payload');
    }
    this.todos[todoIndex] = { ...this.todos[todoIndex], ...todoUpdate } as Todo;
    return this.todos[todoIndex];
  }

  deleteTodo(id: string) {
    const todoIndex = this.todos.findIndex(it => it.id === id);
    if (todoIndex === -1) {
      throw new BadRequestException('invalid todo id');
    }
    this.todos.splice(todoIndex, 1);
  }
}