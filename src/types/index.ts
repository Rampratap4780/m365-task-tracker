// Mirrors a SharePoint List item schema
export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Pending' | 'In Progress' | 'Completed';
export type ApprovalStatus = 'Not Submitted' | 'Pending Approval' | 'Approved' | 'Rejected';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: Priority;
  status: Status;
  approvalStatus: ApprovalStatus;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  approvalComment?: string;
}

export interface ApprovalLog {
  id: string;
  taskId: string;
  taskTitle: string;
  action: 'Submitted' | 'Approved' | 'Rejected';
  comment: string;
  timestamp: string;
}
