import { useTaskStore } from '../../../entities/task/model/taskStore';
import { useState } from 'react';

export const TaskSearch = () => {
  const [query, setQuery] = useState('');
  const { searchTasks, fetchTasks } = useTaskStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      fetchTasks();
    } else {
      searchTasks(value);
    }
  };

  return (
    <input
      type="text"
      placeholder="Поиск по названию или дате..."
      value={query}
      onChange={handleChange}
      style={{width: '300px'}}
    />
  );
};
