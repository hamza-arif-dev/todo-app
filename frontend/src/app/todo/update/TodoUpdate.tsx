import { TodoUpdate } from '@todo-app/types';
import { TodoForm } from '../components';
import { useNavigate } from 'react-router-dom';
import { useTodoProvider } from '../context/TodoContext';

export const UpdateTodo = () => {
  const { selectedTodo } = useTodoProvider();

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const onSubmit = async (values: TodoUpdate) => {
    const response = await fetch(`http://localhost:3000/api/todos/${selectedTodo?.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(values)
    });
    if (response.ok) {
      navigateToHome();
    }
  };

  return <div>
    <button style={{ height: '2rem', marginBottom: '0.85rem' }} type="button" onClick={navigateToHome}>Back</button>
    <TodoForm defaultValues={{ ...selectedTodo }} onSubmit={onSubmit} /></div>;
};