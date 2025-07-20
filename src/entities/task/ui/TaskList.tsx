import { useTaskStore } from '../model/taskStore';
import { useEffect } from 'react';
import { TaskItem } from './TaskItem';
import styled from 'styled-components';

const Grid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

interface TaskListProps {
  statusFilter?: string;
  categoryFilter?: string;
  priorityFilter?: string;
  sortBy?: 'createdAt' | 'priority' | 'status';
}

const priorityOrder = {
  Low: 1,
  Medium: 2,
  High: 3,
};

export const TaskList = ({
  statusFilter = '',
  categoryFilter = '',
  priorityFilter = '',
  sortBy,
}: TaskListProps) => {
  const { tasks, fetchTasks, loading } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      (statusFilter === '' || task.status === statusFilter) &&
      (categoryFilter === '' || task.category === categoryFilter) &&
      (priorityFilter === '' || task.priority === priorityFilter)
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'priority':
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  if (loading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  if (sortedTasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks found.</p>;
  }

  return (
    <Grid>
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Grid>
  );
};
