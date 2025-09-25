import { useEffect, useState } from 'react';
import { Todo } from '@todo-app/types';
import { useNavigate } from 'react-router-dom';
import { Spinner, TextWithLabel } from './components';
import { useTodoProvider } from './context/TodoContext';

export type Data = {
  state: 'initial' | 'loading' | 'success' | 'error'
  todos: Todo[]
}

export const Todos = () => {
  const { onSelectTodo } = useTodoProvider();

  const [data, setData] = useState<Data>({
    state: 'initial',
    todos: []
  });

  const fetchTodos = async () => {
    try {
      setData((prev) => ({ ...prev, state: 'loading' }));
      const response = await fetch('http://localhost:3000/api/todos', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      const res = await response.json();
      const todos = res.data as Todo[];
      setData({ state: 'success', todos });
    } catch (error) {
      setData((prev) => ({ ...prev, state: 'error' }));
    }
  };


  useEffect(() => {
    (async () => {
      await fetchTodos();
    })();
  }, []);

  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate('/create');
  };

  const onEdit = (todo: Todo) => {
    onSelectTodo(todo);
    navigate('/update');
  };

  const onArchive = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ isArchived: true })
    });
    if (response.ok) {
      await fetchTodos();
    }
  };

  const onDone = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ isDone: true })
    });
    if (response.ok) {
      await fetchTodos();
    }
  };

  const onDelete = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    if (response.ok) {
      await fetchTodos();
    }
  };

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }}>
      <button type="button" onClick={navigateToCreate}>Create</button>
    </div>
    {data.state === 'success' && <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {data.todos.map(todo => <div
        style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          background: todo.isDone ? '#e8f5e9' : '#fff',
          border: '1px solid',
          borderColor: todo.isDone ? '#e8f5e9' : '#fff',
          borderRadius: '0.65rem',
          padding: '1rem',
          textDecoration: todo.isArchived ? 'line-through' : 'none'
        }}
        key={todo.id}>
        <TextWithLabel label="Title" text={todo.title} />
        <TextWithLabel label="Description" text={todo.description ?? '-'} />
        <TextWithLabel label="Created At" text={new Date(todo.createdAt).toLocaleString()} />
        <TextWithLabel label="Updated At" text={new Date(todo.updatedAt).toLocaleString()} />
        {(todo.isDone || todo.isArchived) ? null :
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '0.65rem' }}>
              <button style={{ width: '3.5rem' }} onClick={() => onEdit(todo)}>Edit</button>
              <button style={{ width: '3.5rem' }} onClick={() => onDone(todo.id)}>Done</button>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', gap: '0.65rem'}}>
                <button style={{ width: '3.5rem' }} onClick={() => onArchive(todo.id)}>Archive</button>
                  <button style={{width: '3.5rem'}} onClick={() => onDelete(todo.id)}>Delete
                </button>
            </div>
          </div>}
      </div>)}
    </div>}
    {data.state === 'loading' && <Spinner />}
    {data.state === 'error' &&
      <div style={{ border: '1px solid red', color: 'red' }}>Something went wrong. Try refreshing the page.</div>}
  </div>;
};