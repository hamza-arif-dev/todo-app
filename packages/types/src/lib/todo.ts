export type Todo = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  isDone: boolean;
  isArchived: boolean;
}

export type TodoCreate = Pick<Todo, 'title' | 'description'>

export type TodoUpdate = Partial<Pick<Todo, 'title' | 'description' | 'isDone' | 'isArchived'>>