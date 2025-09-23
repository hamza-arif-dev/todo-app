import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResponseWrapper, Todo, TodoCreate, TodoUpdate } from '@todo-app/types';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {
  }

  @Post()
  createTodo(@Body() todoCreate: TodoCreate): ResponseWrapper<Todo> {
    const todo = this.todoService.createTodo(todoCreate);
    return { data: todo };
  }

  @Get()
  findAllTodos(): ResponseWrapper<Todo[]> {
    const todos = this.todoService.findAllTodos();
    return { data: todos };
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() todoUpdate: TodoUpdate): ResponseWrapper<Todo> {
    const todo = this.todoService.updateTodo(id, todoUpdate);
    return { data: todo };
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    this.todoService.deleteTodo(id);
  }
}