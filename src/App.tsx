import React, { useState } from 'react';
import { useTaskStore } from './hooks/useTaskStore';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { ApprovalModal } from './components/ApprovalModal';
import { ApprovalLogPanel } from './components/ApprovalLogPanel';
import { Task, Priority, Status } from './types';

type Tab = 'tasks' | 'log';
type FilterStatus = 'All' | Status;
type FilterPriority = 'All' | Priority;

export default function App() {
  const { tasks, logs, addTask, updateTask, deleteTask, submitForApproval, resolveApproval } = useTaskStore();

  const [tab, setTab] = useState<Tab>('tasks');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [approvalTask, setApprovalTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('All');
  const [search, setSearch] = useState('');

  const filtered = tasks.filter(t => {
    if (filterStatus !== 'All' && t.status !== filterStatus) return false;
    if (filterPriority !== 'All' && t.priority !== filterPriority) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.assignedTo.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const summary = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    pendingApproval: tasks.filter(t => t.approvalStatus === 'Pending Approval').length,
  };

  const selectStyle: React.CSSProperties = { padding: '6px 10px', fontSize: '13px', borderRadius: '6px', border: '0.5px solid #ccc', background: 'white', fontFamily: 'inherit' };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f0', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#0F6E56', padding: '0 1.5rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px', height: '56px' }}>
          <div style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📋</div>
          <span style={{ color: 'white', fontWeight: 500, fontSize: '16px' }}>M365 Task Tracker</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Power Apps + SharePoint + Power Automate</span>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '1.5rem' }}>
        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total tasks', val: summary.total, color: '#444' },
            { label: 'Pending', val: summary.pending, color: '#633806' },
            { label: 'In progress', val: summary.inProgress, color: '#0C447C' },
            { label: 'Completed', val: summary.completed, color: '#27500A' },
            { label: 'Awaiting approval', val: summary.pendingApproval, color: '#633806' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', border: '0.5px solid #e0e0e0', borderRadius: '8px', padding: '0.75rem 1rem' }}>
              <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>{s.label}</div>
              <div style={{ fontSize: '22px', fontWeight: 500, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '1rem', borderBottom: '0.5px solid #e0e0e0' }}>
          {(['tasks', 'log'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 18px', fontSize: '13px', cursor: 'pointer', border: 'none', background: 'none', fontWeight: tab === t ? 500 : 400, color: tab === t ? '#0F6E56' : '#888', borderBottom: tab === t ? '2px solid #0F6E56' : '2px solid transparent', fontFamily: 'inherit' }}>
              {t === 'tasks' ? 'Tasks' : 'Approval Log'}
            </button>
          ))}
        </div>

        {tab === 'tasks' && (
          <>
            {/* Controls */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks or assignee..." style={{ ...selectStyle, flex: 1, minWidth: '160px' }} />
              <select style={selectStyle} value={filterStatus} onChange={e => setFilterStatus(e.target.value as FilterStatus)}>
                <option value="All">All statuses</option>
                <option>Pending</option><option>In Progress</option><option>Completed</option>
              </select>
              <select style={selectStyle} value={filterPriority} onChange={e => setFilterPriority(e.target.value as FilterPriority)}>
                <option value="All">All priorities</option>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
              <button onClick={() => { setEditingTask(null); setShowForm(true); }} style={{ padding: '6px 14px', fontSize: '13px', cursor: 'pointer', borderRadius: '6px', border: 'none', background: '#0F6E56', color: 'white', fontWeight: 500, whiteSpace: 'nowrap' }}>
                + Add task
              </button>
            </div>

            {/* Task form inline */}
            {showForm && (
              <div style={{ background: 'white', border: '0.5px solid #e0e0e0', borderRadius: '10px', padding: '1.25rem', marginBottom: '1rem' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 500 }}>{editingTask ? 'Edit task' : 'New task'}</h3>
                <TaskForm
                  initial={editingTask ?? undefined}
                  onSubmit={data => {
                    if (editingTask) updateTask(editingTask.id, data);
                    else addTask(data);
                    setShowForm(false); setEditingTask(null);
                  }}
                  onCancel={() => { setShowForm(false); setEditingTask(null); }}
                />
              </div>
            )}

            {/* Task grid */}
            {filtered.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#aaa', padding: '2rem' }}>No tasks match your filters.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                {filtered.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => { setEditingTask(task); setShowForm(true); }}
                    onDelete={() => { if (window.confirm('Delete this task?')) deleteTask(task.id); }}
                    onSubmitApproval={() => submitForApproval(task.id)}
                    onApprovalAction={() => setApprovalTask(task)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'log' && <ApprovalLogPanel logs={logs} />}
      </div>

      {/* Approval modal */}
      {approvalTask && (
        <ApprovalModal
          task={approvalTask}
          onResolve={(decision, comment) => resolveApproval(approvalTask.id, decision, comment)}
          onClose={() => setApprovalTask(null)}
        />
      )}
    </div>
  );
}
