import { useState, useEffect } from 'react';
import { Task, ApprovalLog, ApprovalStatus } from '../types';
import { seedTasks, seedLogs } from '../data/seed';

const TASKS_KEY = 'm365_tasks';
const LOGS_KEY = 'm365_approval_logs';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(() => load(TASKS_KEY, seedTasks));
  const [logs, setLogs] = useState<ApprovalLog[]>(() => load(LOGS_KEY, seedLogs));

  useEffect(() => { save(TASKS_KEY, tasks); }, [tasks]);
  useEffect(() => { save(LOGS_KEY, logs); }, [logs]);

  // CREATE — simulates adding a row to a SharePoint list
  function addTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'approvalStatus'>) {
    const now = new Date().toISOString();
    const task: Task = {
      ...data,
      id: crypto.randomUUID(),
      approvalStatus: 'Not Submitted',
      createdAt: now,
      updatedAt: now,
    };
    setTasks(prev => [task, ...prev]);
    return task;
  }

  // UPDATE — simulates editing a list item
  function updateTask(id: string, changes: Partial<Task>) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, ...changes, updatedAt: new Date().toISOString() } : t)
    );
  }

  // DELETE
  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id));
    setLogs(prev => prev.filter(l => l.taskId !== id));
  }

  // SUBMIT FOR APPROVAL — simulates triggering a Power Automate flow
  function submitForApproval(id: string) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    updateTask(id, { approvalStatus: 'Pending Approval' });
    const log: ApprovalLog = {
      id: crypto.randomUUID(),
      taskId: id,
      taskTitle: task.title,
      action: 'Submitted',
      comment: 'Task submitted for manager approval via Power Automate flow.',
      timestamp: new Date().toISOString(),
    };
    setLogs(prev => [log, ...prev]);
  }

  // APPROVE / REJECT — simulates Power Automate approval response
  function resolveApproval(id: string, decision: 'Approved' | 'Rejected', comment: string) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const approvalStatus: ApprovalStatus = decision;
    updateTask(id, { approvalStatus, approvalComment: comment });
    const log: ApprovalLog = {
      id: crypto.randomUUID(),
      taskId: id,
      taskTitle: task.title,
      action: decision,
      comment,
      timestamp: new Date().toISOString(),
    };
    setLogs(prev => [log, ...prev]);
  }

  return { tasks, logs, addTask, updateTask, deleteTask, submitForApproval, resolveApproval };
}
