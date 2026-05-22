import React, { useState } from 'react';
import { Task, Priority, Status } from '../types';

interface Props {
  initial?: Partial<Task>;
  onSubmit: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'approvalStatus'>) => void;
  onCancel: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  fontSize: '14px',
  border: '0.5px solid #ccc',
  borderRadius: '6px',
  marginTop: '4px',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 500,
  color: '#444',
  marginBottom: '12px',
};

export function TaskForm({ initial, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [assignedTo, setAssignedTo] = useState(initial?.assignedTo ?? '');
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? 'Medium');
  const [status, setStatus] = useState<Status>(initial?.status ?? 'Pending');
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !assignedTo.trim() || !dueDate) return;
    onSubmit({ title, description, assignedTo, priority, status, dueDate });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={labelStyle}>
        Title *
        <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" required />
      </label>
      <label style={labelStyle}>
        Description
        <textarea style={{ ...inputStyle, minHeight: '72px', resize: 'vertical' }} value={description} onChange={e => setDescription(e.target.value)} placeholder="What needs to be done?" />
      </label>
      <label style={labelStyle}>
        Assigned To *
        <input style={inputStyle} value={assignedTo} onChange={e => setAssignedTo(e.target.value)} placeholder="Full name" required />
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <label style={labelStyle}>
          Priority
          <select style={inputStyle} value={priority} onChange={e => setPriority(e.target.value as Priority)}>
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
        </label>
        <label style={labelStyle}>
          Status
          <select style={inputStyle} value={status} onChange={e => setStatus(e.target.value as Status)}>
            <option>Pending</option><option>In Progress</option><option>Completed</option>
          </select>
        </label>
        <label style={labelStyle}>
          Due Date *
          <input style={inputStyle} type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
        </label>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '8px' }}>
        <button type="button" onClick={onCancel} style={{ padding: '8px 16px', fontSize: '13px', cursor: 'pointer', borderRadius: '6px', border: '0.5px solid #ccc', background: 'white' }}>
          Cancel
        </button>
        <button type="submit" style={{ padding: '8px 16px', fontSize: '13px', cursor: 'pointer', borderRadius: '6px', border: 'none', background: '#0F6E56', color: 'white', fontWeight: 500 }}>
          {initial?.id ? 'Save changes' : 'Add task'}
        </button>
      </div>
    </form>
  );
}
