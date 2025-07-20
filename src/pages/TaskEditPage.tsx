import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTaskStore } from '../entities/task/model/taskStore';
import { TaskFormModal } from '../features/task-form/ui/TaskFormModal';

export const TaskEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const tasks = useTaskStore(s => s.tasks);
  const fetchTasks = useTaskStore(s => s.fetchTasks);

  useEffect(() => {
    if (tasks.length === 0) {
      fetchTasks();
    }
  }, [tasks.length, fetchTasks]);

  // Сравниваем id как строки, чтобы избежать несоответствия типов
  const task = tasks.find(t => String(t.id) === id);

  if (!task) {
    return <div>Загрузка задачи...</div>;
  }

  const handleClose = () => {
    navigate('/');
  };

  return (
    <TaskFormModal
      isOpen={true}
      onClose={handleClose}
      existingTask={task}
    />
  );
};
