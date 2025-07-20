import type{ Task } from '../../../entities/task/model/task';
import { useState } from 'react';
import { useTaskStore } from '../../../entities/task/model/taskStore';
import styled from 'styled-components';


const DivEdit = styled.div`
    margin: 50px auto;
    border: 5px solid #ff3856;
    width: 350px;
    height: 600px;
    border-radius: 30px;
    background: #ffb6c1;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  existingTask?: Task;
}

export const TaskFormModal = ({ isOpen, onClose, existingTask }: Props) => {
  const createTask = useTaskStore((s) => s.createTask);
  const updateTask = useTaskStore((s) => s.updateTask);

  const [task, setTask] = useState<Task>(
    existingTask ?? {
      id: '0',
      title: '',
      description: '',
      category: 'Feature',
      status: 'To Do',
      priority: 'Medium',
      createdAt: new Date().toISOString(),
    }
  );

  const handleChange = (field: keyof Task) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTask((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!task.title.trim()) return;

    if (existingTask) {
      await updateTask(task);
    } else {
      await createTask({ ...task, createdAt: new Date().toISOString() });
    }

    onClose();
  };

  if (!isOpen) return null;

return (
    <DivEdit>
      <h2>Editing an issue</h2>
      <input name="title" value={task.title} onChange={handleChange('title')} />
      <br />
      <textarea name="description" value={task.description || ''} onChange={(e) => setTask({ ...task, description: e.target.value })} />
      <br />
      <div style={{ display: 'flex',margin: '2px 9px', gap: '10px' }}>
       <select  value={task.category} onChange={handleChange('category')}>
          {['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'].map((val) => (
           <option key={val}>{val}</option>
          ))}
       </select>
        <br />
        <select name="status" value={task.status} onChange={handleChange('status')}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <br />
        <select name="priority" value={task.priority} onChange={handleChange('priority')}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <br/>
      </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
    </DivEdit>
  );
};
