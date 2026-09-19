import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Clock,
  CheckCircle,
  FolderKanban,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const {
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    stats,
    tasks
  } = useTaskContext();

  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/tasks',
      label: 'My Tasks',
      icon: CheckSquare,
      badge: stats.total > 0 ? stats.total : null,
    },
    {
      to: '/today',
      label: 'Today',
      icon: Calendar,
      badge: stats.dueToday > 0 ? stats.dueToday : null,
      badgeColor: 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300',
    },
    {
      to: '/upcoming',
      label: 'Upcoming',
      icon: Clock,
      badge: null,
    },
    {
      to: '/completed',
      label: 'Completed',
      icon: CheckCircle,
      badge: stats.completed > 0 ? stats.completed : null,
      badgeColor: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300',
    },
    {
      to: '/categories',
      label: 'Categories',
      icon: FolderKanban,
      badge: null,
    },
    {
      to: '/analytics',
      label: 'Analytics',
      icon: BarChart3,
      badge: null,
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside
      id="main-sidebar"
      className={`h-full flex flex-col justify-between bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 select-none ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
                  TaskFlow
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    CS101
                  </span>
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate">
                  Student Productivity
                </span>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          {onCloseMobile ? (
            <button
              id="btn-close-mobile-sidebar"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            /* Desktop collapse toggle */
            <button
              id="btn-collapse-sidebar"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label="Toggle sidebar collapse"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  } ${isSidebarCollapsed ? 'justify-center' : ''}`
                }
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105" />
                {!isSidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!isSidebarCollapsed && item.badge !== null && (
                  <span
                    className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${
                      item.badgeColor || 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Student Profile */}
      <div className="p-3 border-t border-zinc-100 dark:border-zinc-800">
        {!isSidebarCollapsed ? (
          <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  SU
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                  Student User
                </span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium truncate">
                  AI & Data Science
                </span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-zinc-200/70 dark:border-zinc-700/60 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <NavLink
                to="/settings"
                onClick={onCloseMobile}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-medium transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                Settings
              </NavLink>
              <button
                onClick={() => alert('Demo session: You are logged in as the demo Student.')}
                className="hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 font-medium transition-colors"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer"
              title="Student User (AI & Data Science)"
            >
              SU
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
