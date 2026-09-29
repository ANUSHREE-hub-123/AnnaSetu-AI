import React from 'react';
import { ShieldCheck, AlertCircle, XCircle } from 'lucide-react';
import { SafetyStatus } from '../../types';

interface StatusBadgeProps {
  status: SafetyStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  };

  switch (status) {
    case 'SAFE':
      return (
        <span
          className={`inline-flex items-center rounded-full font-medium bg-emerald-100 text-emerald-800 border border-emerald-300 ${sizeClasses[size]}`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>SAFE FOR REDISTRIBUTION</span>
        </span>
      );
    case 'URGENT':
      return (
        <span
          className={`inline-flex items-center rounded-full font-medium bg-amber-100 text-amber-900 border border-amber-300 ${sizeClasses[size]}`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
          <span>URGENT DISPATCH NEEDED</span>
        </span>
      );
    case 'UNSAFE':
      return (
        <span
          className={`inline-flex items-center rounded-full font-medium bg-rose-100 text-rose-800 border border-rose-300 ${sizeClasses[size]}`}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-700" />
          <span>UNSUITABLE FOR DONATION</span>
        </span>
      );
    default:
      return null;
  }
};
