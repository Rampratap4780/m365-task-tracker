import React from 'react';
import { ApprovalLog } from '../types';

export function ApprovalLogPanel({ logs }: { logs: ApprovalLog[] }) {
  const actionColor: Record<string, string> = {
    Submitted: '#0C447C',
    Approved: '#27500A',
    Rejected: '#791F1F',
  };

  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 500, margin: '0 0 12px' }}>Approval Log</h2>
      {logs.length === 0 && (
        <p style={{ fontSize: '13px', color: '#888' }}>No approval activity yet.</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {logs.map(log => (
          <div key={log.id} style={{ background: 'white', border: '0.5px solid #e0e0e0', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: actionColor[log.action] }}>
                {log.action === 'Submitted' ? '📤' : log.action === 'Approved' ? '✅' : '❌'} {log.action}
              </span>
              <span style={{ fontSize: '11px', color: '#aaa' }}>
                {new Date(log.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: 500 }}>{log.taskTitle}</p>
            {log.comment && <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>{log.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
