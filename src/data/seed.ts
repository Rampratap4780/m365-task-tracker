import { Task, ApprovalLog } from '../types';

export const seedTasks: Task[] = [
  {
    id: '1',
    title: 'Set up Power Automate flow for onboarding',
    description: 'Create an automated email sequence for new employee onboarding using Power Automate.',
    assignedTo: 'Rampratap Singh',
    priority: 'High',
    status: 'In Progress',
    approvalStatus: 'Approved',
    createdAt: '2026-05-10T09:00:00Z',
    updatedAt: '2026-05-12T11:30:00Z',
    dueDate: '2026-05-25',
    approvalComment: 'Approved. Please proceed with implementation.',
  },
  {
    id: '2',
    title: 'Migrate SharePoint document library',
    description: 'Move legacy documents from file server to SharePoint Online with proper folder structure.',
    assignedTo: 'Priya Sharma',
    priority: 'Medium',
    status: 'Pending',
    approvalStatus: 'Pending Approval',
    createdAt: '2026-05-14T10:00:00Z',
    updatedAt: '2026-05-14T10:00:00Z',
    dueDate: '2026-05-30',
  },
  {
    id: '3',
    title: 'Build Teams notification bot',
    description: 'Configure a bot to send daily digest notifications to the engineering Teams channel.',
    assignedTo: 'Amit Verma',
    priority: 'Low',
    status: 'Pending',
    approvalStatus: 'Not Submitted',
    createdAt: '2026-05-18T08:00:00Z',
    updatedAt: '2026-05-18T08:00:00Z',
    dueDate: '2026-06-10',
  },
];

export const seedLogs: ApprovalLog[] = [
  {
    id: 'log-1',
    taskId: '1',
    taskTitle: 'Set up Power Automate flow for onboarding',
    action: 'Submitted',
    comment: 'Submitting for manager approval.',
    timestamp: '2026-05-11T09:00:00Z',
  },
  {
    id: 'log-2',
    taskId: '1',
    taskTitle: 'Set up Power Automate flow for onboarding',
    action: 'Approved',
    comment: 'Approved. Please proceed with implementation.',
    timestamp: '2026-05-12T11:30:00Z',
  },
];
