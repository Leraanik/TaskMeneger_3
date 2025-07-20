import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TaskEditPage } from './pages/TaskEditPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task/:id" element={<TaskEditPage />} />
    </Routes>
  );
}

export default App
