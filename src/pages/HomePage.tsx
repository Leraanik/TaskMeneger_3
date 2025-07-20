import { useEffect, useState } from 'react';
import { useTaskStore } from '../entities/task/model/taskStore';
import { TaskList } from '../entities/task/ui/TaskList';
import { TaskFormModal } from '../features/task-form/ui/TaskFormModal';
import { TaskSearch } from '../entities/task/ui/TaskSearch';
import styled, { css } from 'styled-components';

const ButtonAdd = styled.button`
  display: block;
  margin: 20px auto;
  border-radius: 100%;
  color: #fff;
  background-color: #ff3856;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  font-weight: bold;
  background: transparent;
  border: none;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #ff3856;
  }
`;

const DivEdit = styled.div<{ isActive: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  ${({ isActive }) =>
    !isActive &&
    css`
      background: transparent;
      pointer-events: none;
      visibility: hidden; 
    `}
`;

const FilterSelect = styled.select`
  margin: 0 10px 20px 0;
  padding: 5px;
`;

export const HomePage = () => {
  const fetchTasks = useTaskStore((s) => s.fetchTasks);

const [sortBy, setSortBy] = useState<'createdAt' | 'priority' | 'status'>('createdAt');
  // Состояния для фильтров
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    fetchTasks();
  }, []);

 

  return (
    <div>
      <div className='HeaderBlock'>
        <div style={{width: '323px'}}></div>
          <h1>Task manager</h1>
          <TaskSearch />
      </div>
      <ButtonAdd onClick={() => setModalOpen(true)}>+</ButtonAdd>
      <div className='blockFilterSort'>
        <FilterSelect value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value=''>Все статусы</option>
          <option value='To Do'>To Do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </FilterSelect>

        <FilterSelect value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value=''>Все категории</option>
          <option value='Bug'>Bug</option>
          <option value='Feature'>Feature</option>
          <option value='Documentation'>Documentation</option>
          <option value='Refactor'>Refactor</option>
          <option value='Test'>Test</option>
        </FilterSelect>

        <FilterSelect value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option value=''>Все приоритеты</option>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </FilterSelect>

        <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
        <option value="createdAt">Сортировка по дате</option>
        <option value="priority">Сортировка по приоритету</option>
        <option value="status">Сортировка по статусу</option>
      </select>
      </div>

      <TaskList statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        priorityFilter={priorityFilter}
        sortBy={sortBy}/>

      <DivEdit isActive={isModalOpen}>
            <CloseButton onClick={() => setModalOpen(false)}>×</CloseButton>
            <TaskFormModal
              isOpen={true}
              onClose={() => setModalOpen(false)}
            />
      </DivEdit>
    </div>
  );
};
