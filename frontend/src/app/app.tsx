import { Navigate, Route, Routes } from 'react-router-dom';
import { CreateTodo, Todos } from './todo';
import { TodoProvider } from './todo/context/TodoContext';
import { UpdateTodo } from './todo/update';

export function App() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '50%',
        background: '#f1f1f1',
        padding: '2rem',
        borderRadius: '0.85rem'
      }}>
        <TodoProvider>
          <Routes>
            <Route path="create" element={<CreateTodo />} />
            <Route path="update" element={<UpdateTodo />} />
            <Route path="" element={<Todos />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </TodoProvider>
      </div>
    </div>
  );
}

export default App;
