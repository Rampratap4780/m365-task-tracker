import React from 'react';
import { Task } from '../types';
import { Badge } from './Badge';

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onSubmitApproval: () => void;
  onApprovalAction: () => void;
}

export function TaskCard({ task, onEdit, onDelete, onSubmitApproval, onApprovalAction }: Props) {
  const card: React.CSSProperties = {
    background: 'white',
    border: '0.5px solid #e0e0e0',
    borderRadius: '10px',
    padding: '1rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const btnBase: React.CSSProperties = {
    fontSize: '12px', padding: '4px 10px', cursor: 'pointer',
    borderRadius: '5px', border: '0.5px solid #ccc', background: 'white',
  };

  const overdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <p style={{ margin: 0, fontWeight: 500, fontSize: '14px', lineHeight: 1.4 }}>{task.title}</p>
        <Badge value={task.priority} />
      </div>

      {task.description && (
        <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{task.description}</p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
        <Badge value={task.status} />
        <Badge value={task.approvalStatus} />
        <span style={{ fontSize: '12px', color: overdue ? '#A32D2D' : '#888', marginLeft: 'auto' }}>
          Due: {new Date(task.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          {overdue && ' ⚠ Overdue'}
        </span>
      </div>

      <div style={{ fontSize: '12px', color: '#888' }}>👤 {task.assignedTo}</div>

      {task.approvalComment && (
        <div style={{ fontSize: '12px', background: '#F1EFE8', borderRadius: '5px', padding: '6px 10px', color: '#444' }}>
          💬 {task.approvalComment}
        </div>
      )}

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', borderTop: '0.5px solid #f0f0f0', paddingTop: '10px' }}>
        <button style={btnBase} onClick={onEdit}>Edit</button>
        <button style={{ ...btnBase, color: '#A32D2D', borderColor: '#F7C1C1' }} onClick={onDelete}>Delete</button>

        {task.approvalStatus === 'Not Submitted' && (
          <button style={{ ...btnBase, background: '#E6F1FB', borderColor: '#B5D4F4', color: '#0C447C' }} onClick={onSubmitApproval}>
            Submit for Approval
          </button>
        )}

        {task.approvalStatus === 'Pending Approval' && (
          <button style={{ ...btnBase, background: '#FAEEDA', borderColor: '#FAC775', color: '#633806' }} onClick={onApprovalAction}>
            Review Approval
          </button>
        )}
      </div>
    </div>
  );
}
