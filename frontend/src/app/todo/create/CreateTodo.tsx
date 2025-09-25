import { TodoCreate } from '@todo-app/types';
import { TodoForm } from '../components';
import { useNavigate } from 'react-router-dom';

export const CreateTodo = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const onSubmit = async (values: TodoCreate) => {
    const response = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
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
    <TodoForm onSubmit={onSubmit} /></div>;
};