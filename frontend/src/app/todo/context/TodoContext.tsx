import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Todo } from '@todo-app/types';

export type TodoContextValue = {
  selectedTodo?: Todo;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const onSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };


  return <TodoContext.Provider value={{ selectedTodo, onSelectTodo }}>{children}</TodoContext.Provider>;
};

export const useTodoProvider = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodoProvider must be within TodoProvider');
  }

  return context;
};