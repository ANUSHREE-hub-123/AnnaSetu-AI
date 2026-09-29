import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, AlertCircle } from 'lucide-react';
import { UrgencyLevel } from '../../types';

export interface CountdownTimerProps {
  initialMinutes: number;
  label?: string;
  isUrgent?: boolean;
  onUrgencyChange?: (urgency: UrgencyLevel) => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes,
  label = 'Safe Redistribution Window',
  isUrgent: propIsUrgent,
  onUrgencyChange
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialMinutes * 60);

  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        const next = Math.max(0, prev - 1);
        if (onUrgencyChange) {
          const mins = Math.floor(next / 60);
          if (mins <= 10) onUrgencyChange('EXPIRING');
          else if (mins <= 60) onUrgencyChange('URGENT');
          else onUrgencyChange('SAFE');
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining, onUrgencyChange]);

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  const isExpiring = mins <= 10;
  const isUrgent = propIsUrgent || (mins <= 60 && !isExpiring);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
        isExpiring
          ? 'bg-rose-50 border-rose-300 text-rose-800 animate-pulse'
          : isUrgent
          ? 'bg-amber-50 border-amber-300 text-amber-900'
          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
      }`}
    >
      {isExpiring ? (
        <AlertCircle className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
      ) : isUrgent ? (
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
      ) : (
        <Clock className="w-3.5 h-3.5 text-emerald-600" />
      )}
      <span className="text-slate-500 font-medium">{label}:</span>
      <span className="font-mono text-sm font-bold">
        {secondsRemaining <= 0
          ? 'EXPIRED'
          : `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`}
      </span>
    </div>
  );
};
