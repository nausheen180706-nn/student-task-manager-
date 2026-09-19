import React, { useRef, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Bell, CheckCheck, Trash2, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useTaskContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      ref={dropdownRef}
      id="notification-dropdown-panel"
      className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
              {unreadCount} new
            </span>
          )}
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="text-xs font-medium text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/70">
        {notifications.length === 0 ? (
          <div className="py-8 text-center px-4">
            <CheckCheck className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">All caught up!</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">No notifications at the moment.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer flex gap-3 ${
                !item.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {item.type === 'info' && <Info className="w-4 h-4 text-sky-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {item.message}
                </p>
              </div>
              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 self-center" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/40 border-t border-zinc-100 dark:border-zinc-800 text-center">
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
          Task reminders & system activity updates
        </span>
      </div>
    </div>
  );
};
