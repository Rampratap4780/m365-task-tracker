import React from 'react';
import { Priority, Status, ApprovalStatus } from '../types';

type BadgeVariant = Priority | Status | ApprovalStatus;

const styles: Record<string, React.CSSProperties> = {
  base: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 500,
    padding: '2px 8px',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
  },
  High:               { background: '#FCEBEB', color: '#791F1F' },
  Medium:             { background: '#FAEEDA', color: '#633806' },
  Low:                { background: '#EAF3DE', color: '#27500A' },
  Completed:          { background: '#EAF3DE', color: '#27500A' },
  'In Progress':      { background: '#E6F1FB', color: '#0C447C' },
  Pending:            { background: '#F1EFE8', color: '#444441' },
  Approved:           { background: '#EAF3DE', color: '#27500A' },
  Rejected:           { background: '#FCEBEB', color: '#791F1F' },
  'Pending Approval': { background: '#FAEEDA', color: '#633806' },
  'Not Submitted':    { background: '#F1EFE8', color: '#5F5E5A' },
};

export function Badge({ value }: { value: BadgeVariant }) {
  return <span style={{ ...styles.base, ...(styles[value] ?? {}) }}>{value}</span>;
}
