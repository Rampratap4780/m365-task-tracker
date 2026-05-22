import React, { useState } from 'react';
import { Task } from '../types';

interface Props {
  task: Task;
  onResolve: (decision: 'Approved' | 'Rejected', comment: string) => void;
  onClose: () => void;
}

export function ApprovalModal({ task, onResolve, onClose }: Props) {
  const [comment, setComment] = useState('');

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
  };
  const modal: React.CSSProperties = {
    background: 'white', borderRadius: '10px', padding: '1.5rem',
    width: '100%', maxWidth: '440px', boxSizing: 'border-box',
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={e => e.stopPropagation()}>
        <p style={{ fontSize: '12px', color: '#888', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Power Automate Approval</p>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px' }}>{task.title}</h3>
        <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px' }}>Assigned to: {task.assignedTo}</p>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
          Comment (optional)
          <textarea
            style={{ display: 'block', width: '100%', marginTop: '4px', padding: '8px', fontSize: '13px', border: '0.5px solid #ccc', borderRadius: '6px', minHeight: '72px', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment for the requester..."
          />
        </label>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
          <button onClick={onClose} style={{ padding: '8px 14px', fontSize: '13px', cursor: 'pointer', borderRadius: '6px', border: '0.5px solid #ccc', background: 'white' }}>Cancel</button>
          <button onClick={() => { onResolve('Rejected', comment || 'Rejected by approver.'); onClose(); }}
            style={{ padding: '8px 14px', fontSize: '13px', cursor: 'pointer', borderRadius: '6px', border: 'none', background: '#A32D2D', color: 'white', fontWeight: 500 }}>
            Reject
          </button>
          <button onClick={() => { onResolve('Approved', comment || 'Approved.'); onClose(); }}
            style={{ padding: '8px 14px', fontSize: '13px', cursor: 'pointer', borderRadius: '6px', border: 'none', background: '#0F6E56', color: 'white', fontWeight: 500 }}>
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
